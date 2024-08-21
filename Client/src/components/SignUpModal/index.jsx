const SignUpModal = ({
    onClose,
    onSubmit,
    username,
    setUsername,
    password,
    setPassword,
  }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Sign Up to Comment</h3>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  export default SignUpModal