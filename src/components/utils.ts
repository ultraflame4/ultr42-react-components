import {FunctionComponent, PropsWithChildren} from "react";

export function defComponent<P>(component: FunctionComponent<PropsWithChildren<P>>): FunctionComponent<PropsWithChildren<P>>{

    return component
}
