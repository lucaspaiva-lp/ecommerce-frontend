export default function loginPage() {
  return `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="seu@email.com" required />
          
          <label for="password">Senha</label>
          <input type="password" id="password" placeholder="********" required />
          
          <button type="submit" class="btn">Entrar</button>
        </form>
      </div>
    </div>
  `;
}
