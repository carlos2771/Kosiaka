export default {
    jwtSecret : process.env.JWT_SECRET || "SECRETDOOR",
    DB:{
        URI: process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/kosiaka?retryWrites=true&w=majority&appName=Cluster0",
        USER: process.env.MONGODB_USER || "admin",
        PASSWORD: process.env.MONGODB_PASSWORD ||"admin"
    }
}