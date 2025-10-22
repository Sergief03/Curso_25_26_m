export const renderLoginForm = () => {
  return `
    <h1>Login:</h1>
    <ul>
    <form id="loginForm">
        <label>Username:</label>
        <input type="text" id="username" name="username" required />

        <label>Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
    </form>
    <p id="messageLogin"></p>
    </ul>
    
    <h1>Register:</h1>
    <ul>
    <form id="registerForm">
        <label>Username:</label>
        <input type="text" id="usernameR" name="usernameR" required />

        <label>Password:</label>
        <input type="password" id="passwordR" name="passwordR" required />

        <button type="submit">Register</button>
    </form>
    <p id="messageRegister"></p>
    </ul>
  `;
};