import Button from '@mui/material/Button';
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <h1>Welcome to</h1><p/>
            <img src="Playlister.png" alt="Playlister logo"></img>
            <h3>The #1 site for creating and sharing music playlists all around the world!</h3><p/>
            <Button variant="contained" href="register">Create Account</Button><p/>
            <Button variant="contained" href="login">Login</Button><p/>
            <Button variant="contained" href="">Continue as Guest</Button><p/>
            Created by Isabella Misanes
        </div>
    )
}