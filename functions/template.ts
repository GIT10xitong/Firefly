export function getTemplate({
  redirectPath,
  withError
}: {
  redirectPath: string;
  withError: boolean;
}): string {
  return `
  <!doctype html>
  <html lang="zh-CN" data-theme="dark">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>私人博客 - 请先登录</title>
      <meta name="description" content="This site is password protected.">
      <!-- 防止搜索引擎抓取登录页 -->
      <meta name="robots" content="noindex, nofollow">
      
      <!-- 你可以把这里的图标换成你自己的，比如 href="/favicon.ico" -->
      <link rel="shortcut icon" href="/favicon.ico">

      <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">

      <style>
        /* 1. 默认背景：青色到青绿色的柔和渐变（如果你以后想换背景图，删掉这一块换成 url() 即可） */
        body {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          margin: 0;
          min-height: 100vh;
        }

        /* 2. 页面居中排版 */
        body > main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
          max-width: 450px;
          margin: 0 auto;
        }

        /* 3. 毛玻璃卡片效果 */
        article {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 188, 212, 0.3) !important;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }

        /* 4. 标题颜色 */
        h1 { color: #00BCD4 !important; margin-bottom: 0.5rem; }
        h2 { color: #009688 !important; font-size: 1rem; font-weight: normal; }

        /* 5. 错误提示框：浅青色背景，深红色字 */
        .error {
          background: #7FFFD4;
          border-radius: 8px;
          color: #d32f2f;
          padding: 0.75em 1em;
          font-weight: bold;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        /* 6. 输入框容器（为了放小眼睛） */
        .input-group {
          position: relative;
          margin-bottom: 1rem;
        }

        /* 7. 输入框样式 */
        input[type="password"], input[type="text"] {
          width: 100%;
          margin-bottom: 0 !important;
          background: rgba(0, 0, 0, 0.2) !important;
          border: 1px solid #009688 !important;
          border-radius: 8px !important;
          color: #fff !important;
          padding-right: 40px !important; /* 给右边的小眼睛留位置 */
        }
        
        input[type="password"]:focus, input[type="text"]:focus {
          border-color: #00BCD4 !important;
          box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.3) !important;
        }

        /* 8. 小眼睛按钮样式 */
        .eye-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          opacity: 0.6;
          font-size: 1.2rem;
          user-select: none;
        }
        .eye-icon:hover { opacity: 1; }

        /* 9. 登录按钮 */
        button[type="submit"] {
          background-color: #009688 !important;
          border-color: #009688 !important;
          color: white !important;
          border-radius: 8px !important;
          transition: all 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #00BCD4 !important;
          border-color: #00BCD4 !important;
        }
      </style>
    </head>

    <body>
      <main>
        <article>
          <hgroup>
            <h1>虚源玄影道标</h1>
            <h2>验证它的创造者</h2>
          </hgroup>
          
          <!-- 密码错误提示（原有逻辑） -->
          ${withError ? `<p class="error">密码错误，请重试！</p>` : ''}
          
          <!-- 表单（原有逻辑，未做任何破坏性修改） -->
          <form method="post" action="/cfp_login" id="loginForm">
            <input type="hidden" name="redirect" value="${redirectPath}" />
            
            <!-- 密码输入框和显示/隐藏按钮 -->
            <div class="input-group">
              <input type="password" name="password" id="pwdInput" placeholder="请输入密码" aria-label="Password" autocomplete="current-password" required autofocus>
              <span class="eye-icon" id="togglePwd" title="显示/隐藏密码">👁️</span>
            </div>
            
            <button type="submit" id="submitBtn">进入</button>
          </form>

        </article>
      </main>

      <script>
        // 1. 显示/隐藏密码功能
        const pwdInput = document.getElementById('pwdInput');
        const togglePwd = document.getElementById('togglePwd');
        
        togglePwd.addEventListener('click', function() {
          // 如果当前是密码模式，就换成文本模式（显示明文）
          if (pwdInput.type === 'password') {
            pwdInput.type = 'text';
            togglePwd.style.opacity = '1';
          } else {
            pwdInput.type = 'password';
            togglePwd.style.opacity = '0.6';
          }
        });

        // 2. 防止重复点击提交
        const loginForm = document.getElementById('loginForm');
        const submitBtn = document.getElementById('submitBtn');
        
        loginForm.addEventListener('submit', function() {
          // 提交时禁用按钮并改字，防止手抖重复点击
          submitBtn.disabled = true;
          submitBtn.innerText = '验证中...';
          submitBtn.style.opacity = '0.7';
          submitBtn.style.cursor = 'not-allowed';
        });
      </script>
    </body>

  </html>
  `;
}
