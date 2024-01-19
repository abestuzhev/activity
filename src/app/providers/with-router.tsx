import {BrowserRouter} from "react-router-dom";
import React, {Suspense} from "react";

export const withRouter = (components: () => React.ReactNode) => () =>  (
    <BrowserRouter>
        <Suspense fallback={"Loading..."}>
            {components()}
        </Suspense>
    </BrowserRouter>
)