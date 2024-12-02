import Role from "../models/role";
import User from "../models/user";

export const hasRoles = (requiredRoles: string[]) => {
  return async (req: any, res: any, next: any) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

      const roles = await Role.find({ _id: { $in: user.roles } });
      const userRoles = roles.map((role) => role.name);
      console.log("user roles", userRoles);
      
      const hasRequiredRole = requiredRoles.some((role) => // verifica si los roles que se le pasan a la ruta cohinciden con el rol que contiene el usuario en bd
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        return res.status(403).json({ msg: `Requiere uno de los siguientes roles: ${requiredRoles.join(", ")}` });
      }

      next();
    } catch (error) {
      console.error("Error verificando roles:", error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
};
