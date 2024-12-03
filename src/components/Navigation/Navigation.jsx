import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => (
  <nav className={s.nav}>
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? `${s.link} ${s.active}` : s.link
      }
      end
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) =>
        isActive ? `${s.link} ${s.active}` : s.link
      }
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
