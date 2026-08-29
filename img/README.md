# 截圖

WebP，寬 1600 px。轉檔與尺寸標註方式見專案根目錄的 `README.md`。

## 現有的圖

| 檔案 | 用在哪 | 內容 |
|---|---|---|
| `br-status.webp` | `install.html` step 3 | `/br status`，`engine:` 解析到 `blockreality\engine\c4d571a5911b\` |
| `creative-tab.webp` | `usage.html` #items | 創造分頁，九種結構方塊 + 應力眼鏡 |
| `column-selfweight.webp` | `usage.html` 加載步驟 | 鋼柱只受自重，`max D/C 0.004`，斷面上下同為 −1.46 MPa |
| `column-loaded.webp` | `usage.html` 加載步驟 | 同一根柱 `/br load 1 1 1`，`max D/C 0.030`，滿刻度 ±10.45 MPa |
| `utilisation-lens.webp` | `index.html` hero、OG 預覽圖 | 利用率鏡頭 |
| `version.webp` | `install.html` step 1 | CurseForge 建立 Forge 1.20.1 設定檔 |
| `analysis.webp` | `usage.html` | 拿眼鏡看結構 |
| `buildsomething.webp` | `usage.html` | 蓋一個小結構 |
| `somethingbigger.webp` | `usage.html` | 較大的結構 |
| `devlog2.webp` | `devlog.html` | Mimo 學習進度 |

`br-status.webp` 路徑裡有 Windows 使用者名稱（`wmc02`）。舊的 `status.png` 也有，所以
維持現況；要遮的話那一段沒辦法裁掉（`engine:` 整行就是這張圖的重點），只能塗。

## 還缺的一張

### `buckling.webp` — 「應力說安全，穩定說不安全」

現有的兩張柱子圖 `λ_cr` 分別是 3.14 與 4.20，**都大於 1，也就是都還穩定**，
所以還沒有一張圖能講到這個 mod 最好講的一件事。

`evidence/VERIFICATION.md` 裡量過的案例可以照抄：**20 m 鋼柱受 400 kN**，
結果是 `max D/C = 0.0187`（應力看起來非常安全）配上 `λ_cr = 0.63`（已經失穩）。

**怎麼拍**：蓋一根 20 格高的結構鋼柱，接地，頂端 `/br load 0 -400 0`。

**必須同時看得到**：`max D/C` 是 0.0x 的等級，`buckling λ_cr` 低於 1 並顯示
`ALREADY UNSTABLE`。一張圖同時出現「強度用不到 2%」和「幾何剛度已經用完」，
文字講三段都不如這張圖一眼。

**放在**：`index.html` 的 `#model`（講挫屈獨立回報那一條下面），或 `usage.html`。

```html
<figure class="shot">
  <img src="img/buckling.webp" width="1600" height="___" loading="lazy" decoding="async"
    alt="A slender steel column with max D/C far below 1 while the buckling factor has dropped under 1">
  <figcaption>Strength and stability are different questions: <code>max D/C</code> says the
    material is barely working, <code>λ_cr</code> says the column has already gone.</figcaption>
</figure>
```
