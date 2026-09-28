import { useState } from "react";
import { login } from "../../services/api";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await login(username, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);

            onLogin();
        } catch (error) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>ApexCare</h1>
                <p>Healthcare Operations Platform</p>

                <form onSubmit={handleLogin}>

                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        placeholder="Enter username"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter password"
                        required
                    />

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <div className="demo-login">
                    <small>Demo credentials</small>
                    <div>Username: admin</div>
                    <div>Password: admin123</div>
                </div>
            </div>
        </div>
    );
}

export default Login;