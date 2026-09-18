![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是我在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App。專案以純前端技術實作，讓使用者能在瀏覽器中管理待辦事項，並使用篩選與深色模式支援日常使用情境。

## 線上展示

https://rayliu1106.github.io/my-copilot-workshop/

## 功能

- 新增待辦事項。
- 防止空白內容送出。
- 將待辦事項標記為完成或取消完成。
- 以刪除線與淡化樣式識別已完成事項。
- 刪除單筆待辦事項。
- 即時顯示未完成事項數量。
- 依照全部、未完成或已完成篩選清單。
- 在沒有符合項目時顯示狀態提示。
- 切換淺色與深色模式。
- 深色模式偏好儲存在瀏覽器中。
- 未設定手動主題時，跟隨作業系統的深色模式偏好。
- 將待辦資料儲存在瀏覽器 `localStorage`。
- 重新整理頁面後保留待辦資料。
- 使用響應式卡片版面支援手機螢幕。

## 技術

- 使用純 HTML 建立頁面結構。
- 使用 CSS 處理版面、元件樣式與深淺色主題。
- 使用原生 JavaScript 處理互動與資料存取。
- 不使用任何框架或套件。
- 不建立 `package.json`，也不需要建置流程。
- 不引用外部 CDN，可離線運作。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好。
- 主要檔案固定為根目錄的 `index.html`、`styles.css` 與 `app.js`。

## 開發方式

本專案在 GitHub Copilot 實戰工作坊中，依照以下方式完成：

- 使用 GitHub Copilot Agent Mode，從需求描述開始規劃並建立待辦清單的 HTML、CSS 與 JavaScript。
- 使用 MCP 連接 Microsoft Learn，查詢 CSS 深色模式與無障礙色彩對比等官方文件。
- 使用 MCP 連接 GitHub，讀取專案 issue，取得實際的修復需求。
- 建立 `.github/copilot-instructions.md`，定義專案的技術限制與程式風格。
- 建立 `.github/prompts/fix-issue.prompt.md`，將讀取 issue、提出計畫、修改、驗證與建立 Pull Request 的流程整理成可重複使用的 agentic workflow。
- 使用 Git 分支、提交與 Pull Request 管理修改內容。

## 我學到什麼

- Agent Mode 適合處理具體且完整的專案需求，也需要搭配清楚的限制條件。
- MCP 能讓 Copilot 取得官方文件與 GitHub issue 等專案外部資訊。
- 將協作規則寫入專案檔案，可以讓後續修改更一致。
- 將重複的修復流程整理成 prompt，有助於建立可重複的工作方式。
- 使用分支、提交與 Pull Request，可以保留修改脈絡並降低直接改動主線的風險。
