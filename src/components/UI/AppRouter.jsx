
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router"
import React from "react";


const AppRouter = () => {
    const isAuth=false

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map((rout, ind) =>
                    <Route exact={rout.exact} path={rout.path} element={rout.element} key={"rout" + ind}/>

                )}
            </Routes>
            : <Routes>
                {publicRoutes.map((rout, ind) =>
                    <Route exact={rout.exact} path={rout.path} element={rout.element} key={"rout" + ind}/>
                )}
            </Routes>

    );
};

export default AppRouter;