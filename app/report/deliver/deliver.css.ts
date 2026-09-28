// Scoped styles for the internal delivery page (everything under .dv). Modern, calm internal-tool look.
export const DELIVER_CSS = `
.dv{min-height:100vh;background:#F2F4F8;color:#1F2A3D;font-family:var(--font-body);font-size:15px;line-height:1.5}
.dv *{box-sizing:border-box}
.dv a{color:#1C4FE0}
.dv-top{position:sticky;top:0;z-index:5;height:56px;padding:0 max(20px,env(safe-area-inset-left));display:flex;align-items:center;gap:12px;background:#0B1B33;color:#fff}
.dv-top img{height:22px;width:auto}
.dv-top .t{font-family:var(--font-display);font-weight:700;font-size:15px;opacity:.9;padding-left:12px;border-left:1px solid rgba(255,255,255,.18)}
.dv-top .env{margin-left:auto;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.1);color:#D8E3F5}
.dv-top .env.test{background:#FFE45C;color:#0B1B33}
.dv-main{max-width:1040px;margin:0 auto;padding:24px 16px 56px}
.dv-card{background:#fff;border:1px solid #DCE2EB;border-radius:14px;padding:20px;box-shadow:0 1px 2px rgba(11,27,51,.04)}
.dv h1{font-family:var(--font-display);font-weight:800;font-size:28px;line-height:1.15;letter-spacing:-.02em;color:#0B1B33;margin:0}
.dv h2{font-family:var(--font-display);font-weight:700;font-size:17px;color:#0B1B33;margin:0 0 14px}
.dv p{margin:0}
.dv-muted{color:#67748A}
.dv-narrow{max-width:440px;margin:40px auto 0;display:grid;gap:14px}
.dv-field{display:grid;gap:6px;font-size:14px;font-weight:600;color:#0B1B33}
.dv-input{height:48px;border:1px solid #C9D3E2;border-radius:10px;padding:0 14px;font:inherit;font-size:16px;font-weight:400;color:#0B1B33;background:#fff;width:100%}
.dv-input:focus{outline:none;border-color:#1C4FE0;box-shadow:0 0 0 3px rgba(28,79,224,.15)}
.dv-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 22px;border:0;border-radius:10px;background:#1C4FE0;color:#fff;font-family:var(--font-display);font-weight:800;font-size:16px;cursor:pointer;width:100%;box-shadow:0 3px 0 #0B1B33}
.dv-btn:hover{background:#1640b8}
.dv-btn:active{transform:translateY(2px);box-shadow:0 1px 0 #0B1B33}
.dv-btn[disabled]{opacity:.6;cursor:progress}
.dv-link{background:none;border:0;padding:0;font:inherit;font-size:13px;color:#67748A;text-decoration:underline;cursor:pointer}
.dv-head{display:grid;gap:10px}
.dv-status{justify-self:start;display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;padding:5px 12px;border-radius:999px}
.dv-status::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor}
.dv-status.wait{background:#E9EFFF;color:#1C4FE0}.dv-status.done{background:#DDF1E5;color:#137A45}.dv-status.form{background:#FFF3CD;color:#7A5A00}
.dv-meta{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:14px;color:#67748A}
.dv-no{font-family:var(--font-mono);font-weight:500;color:#0B1B33;letter-spacing:.02em}
.dv-due{margin:14px 0;display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;padding:16px 20px;border-radius:14px;border:2px solid #0B1B33;background:#FFE45C;color:#0B1B33}
.dv-due .lbl{font-size:13px;font-weight:700;opacity:.75;width:100%}
.dv-due .when{font-family:var(--font-display);font-weight:800;font-size:22px;letter-spacing:-.01em}
.dv-due .ist{font-size:14px;opacity:.8}
.dv-due .left{margin-left:auto;font-family:var(--font-display);font-weight:800;font-size:16px;padding:6px 12px;border-radius:999px;background:#0B1B33;color:#fff}
.dv-due.soon{background:#FFD18A}
.dv-due.late{background:#FDECEC;border-color:#C62828;color:#7F1D1D}.dv-due.late .left{background:#C62828}
.dv-due.done{background:#EAF7EF;border-color:#1E8E4E;color:#14532D}.dv-due.done .left{background:#1E8E4E}
.dv-due.none{background:#fff;border-style:dashed}
.dv-grid{display:grid;gap:14px}
@media(min-width:900px){.dv-grid{grid-template-columns:1.1fr 1fr;align-items:start}.dv-send{position:sticky;top:72px}}
.dv-dl{display:grid;margin:0}
.dv-dl>div{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:11px 0;border-top:1px solid #EDF1F6}
.dv-dl>div:first-child{border-top:0;padding-top:0}
@media(max-width:520px){.dv-dl>div{grid-template-columns:92px 1fr;gap:10px}}
.dv-dl dt{font-size:13px;color:#67748A}
.dv-dl dd{margin:0;color:#0B1B33;overflow-wrap:anywhere}
.dv-chips{display:flex;flex-wrap:wrap;gap:6px}
.dv-chip{display:inline-block;padding:3px 10px;border-radius:999px;background:#F2F4F8;border:1px solid #DCE2EB;font-size:13.5px;color:#0B1B33}
.dv-note{padding:12px 14px;border-radius:10px;background:#FFF6DA;border:1px solid #F1DE7A;font-size:14px;color:#0B1B33}
.dv-drop{position:relative;display:grid;place-items:center;align-content:center;gap:4px;text-align:center;min-height:132px;padding:18px;border:2px dashed #B9C6DB;border-radius:12px;background:#F8FAFD;color:#67748A;transition:border-color .15s,background .15s}
.dv-drop strong{color:#0B1B33;font-size:15px}
.dv-drop input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.dv-drop.over,.dv-drop:hover{border-color:#1C4FE0;background:#F0F4FF}
.dv-drop.has{border-style:solid;border-color:#1E8E4E;background:#F2FBF5}
.dv-quick{display:flex;flex-wrap:wrap;gap:6px}
.dv-quick button{border:1px solid #C9D3E2;background:#fff;border-radius:999px;padding:6px 12px;font:inherit;font-size:13px;font-weight:600;color:#0B1B33;cursor:pointer}
.dv-quick button.g{border-color:#9FD6B4}.dv-quick button.a{border-color:#F1C96B}.dv-quick button.r{border-color:#F0A6A6}
.dv-quick button:hover{background:#F2F4F8}
.dv-err{color:#C62828;font-size:14px;font-weight:600}
.dv-ok{display:grid;gap:6px;padding:18px;border-radius:12px;background:#EAF7EF;border:1px solid #9FD6B4;color:#14532D}
.dv-ok strong{font-family:var(--font-display);font-size:18px}
.dv-foot{margin-top:18px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
`;
