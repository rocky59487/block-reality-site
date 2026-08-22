/**
 * Block Reality — Minecraft 方塊碎裂粒子特效 & 背景極速預載入
 */

document.addEventListener("DOMContentLoaded", () => {
  const mcButtons = document.querySelectorAll(".mc-btn");

  mcButtons.forEach((btn) => {
    const targetUrl = btn.getAttribute("href");
    const isInternalLink = targetUrl && !btn.getAttribute("target") && !targetUrl.startsWith("#");

    // 🚀 背景加速：當滑鼠懸浮 (hover) 在按鈕上時，提前在背景預取 (Prefetch) 網頁
    if (isInternalLink) {
      btn.addEventListener("mouseenter", () => {
        prefetchPage(targetUrl);
      }, { once: true });
    }

    // 點擊觸發 Minecraft 粒子噴發
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const clickX = e.clientX || rect.left + rect.width / 2;
      const clickY = e.clientY || rect.top + rect.height / 2;

      // Minecraft 方塊色盤（紅石、深磚、熔岩、泥土、黑石、砂金）
      const mcColors = [
        "#e0533d", "#c0392b", "#e67e22", "#d35400",
        "#8c5828", "#5c3c1e", "#f39c12", "#2c3e50"
      ];

      // 噴射 28 顆方塊像素
      const particleCount = 28;
      for (let i = 0; i < particleCount; i++) {
        createMinecraftParticle(clickX, clickY, mcColors);
      }

      // 💥 關鍵修復：如果是內部跳轉連結，先阻止立即換頁，背景預載入並等待 200ms 粒子噴發後平滑切換！
      if (isInternalLink) {
        e.preventDefault();
        prefetchPage(targetUrl); // 確保觸發背景載入

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 200); // 200 毫秒粒子噴發完畢後瞬間切換
      }
    });
  });
});

/**
 * 🚀 背景極速預載入 (Instant Prefetch)
 */
const prefetchedUrls = new Set();
function prefetchPage(url) {
  if (prefetchedUrls.has(url)) return;
  prefetchedUrls.add(url);

  // 1. 動態加入 <link rel="prefetch"> 讓瀏覽器優先載入快取
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  document.head.appendChild(link);

  // 2. 備用 fetch 快取
  try {
    fetch(url, { priority: "high" }).catch(() => {});
  } catch (err) {}
}

/**
 * 創建單顆 Minecraft 像素方塊並執行動畫
 */
function createMinecraftParticle(originX, originY, colors) {
  const particle = document.createElement("div");
  particle.className = "mc-particle";

  // 隨機像素大小：4px ~ 9px
  const size = Math.floor(Math.random() * 6) + 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // 隨機顏色
  const color = colors[Math.floor(Math.random() * colors.length)];
  particle.style.backgroundColor = color;

  document.body.appendChild(particle);

  // 物理初速度
  let vx = (Math.random() - 0.5) * 8.5;     // 水平向左右噴發
  let vy = -(Math.random() * 5.5 + 3.5);    // 初始向上噴射
  const gravity = 0.28;                    // 重力加速度
  const friction = 0.98;                   // 水平阻力

  // 初始位置以點擊處為中心
  let currentX = originX + (Math.random() - 0.5) * 14;
  let currentY = originY + (Math.random() - 0.5) * 14;
  let opacity = 1.0;
  let rotation = Math.random() * 360;
  const rotSpeed = (Math.random() - 0.5) * 16;

  particle.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

  function animate() {
    currentX += vx;
    currentY += vy;
    vy += gravity;
    vx *= friction;
    rotation += rotSpeed;
    opacity -= 0.016;

    if (opacity <= 0) {
      particle.remove();
    } else {
      particle.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
      particle.style.opacity = opacity;
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}