
import {Route, Routes} from "react-router-dom";
import {RouteNode, RouterMap} from "./index"
import React, {FC} from "react";


const AppRouter:FC = () => {
    return (
        <Routes>
            {Object.values(RouterMap).map((node:RouteNode, ind) =>
                <Route  element={node.element} key={"rout" + ind} path={node.path}/>
            )}

        </Routes>

    );

 /*   return (
             <Routes>
                {pubicRoutes.map((rout, ind) =>
                  <Route  element={rout.element} key={"rout" + ind} path={rout.path}/>
                )}

            </Routes>

    );*/
};

export default AppRouter;
