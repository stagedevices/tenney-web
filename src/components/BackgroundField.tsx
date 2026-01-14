import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "../lib/reducedMotion";

const vertexSource = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentSource = `#version 300 es
precision highp float;
out vec4 outColor;
uniform float u_time;
uniform vec2 u_resolution;

float grid(vec2 uv, float scale) {
  vec2 gv = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
  float line = min(gv.x, gv.y);
  return 1.0 - min(line, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centered = uv * 2.0 - 1.0;
  float t = u_time * 0.05;
  float drift = sin((centered.x + t) * 3.0) * 0.02 + cos((centered.y - t) * 2.0) * 0.02;
  vec2 flow = centered + drift;
  float lattice = grid(flow, 8.0) * 0.25 + grid(flow, 16.0) * 0.15;
  float glow = pow(max(0.0, 0.85 - length(flow)), 2.0) * 0.15;
  vec3 color = vec3(0.02, 0.63, 0.9) * lattice + vec3(0.1, 0.2, 0.4) * glow;
  float glint = smoothstep(0.92, 1.0, sin((uv.x + u_time * 0.05) * 30.0)) * 0.05;
  outColor = vec4(color + glint, 0.6);
}`;

export default function BackgroundField() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") return true;
    const memory = navigator.deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    return memory <= 4 || cores <= 4 || coarse;
  }, []);

  useEffect(() => {
    if (reducedMotion || isLowPower) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) return;

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    let animationFrame = 0;
    const start = performance.now();
    const render = (time: number) => {
      const elapsed = (time - start) / 1000;
      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion, isLowPower]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="lattice-fallback grain absolute inset-0" />
      {!reducedMotion && !isLowPower && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-70"
          aria-hidden
        />
      )}
    </div>
  );
}
