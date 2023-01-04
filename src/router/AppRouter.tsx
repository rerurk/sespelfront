
import {Route, Routes} from "react-router-dom";
import {pubicRoutes} from "./index"
import React, {FC} from "react";


const AppRouter:FC = () => {

    return (
             <Routes>
                {pubicRoutes.map((rout, ind) =>
                  <Route element={rout.element} key={"rout" + ind} path={rout.path}/>
                )}
            </Routes>

    );
};

export default AppRouter;

/*
*  <Routes>
                {pubicRoutes.map((rout, ind) =>
                    <RoutesView exact={rout.exact} path={rout.path} element={rout.element} key={"rout" + ind}/>
                )}
            </Routes>
* */



/*

  }*/