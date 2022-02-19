import { createElement } from "react";
const React = { createElement };


import { Placeholder } from "mendix/Placeholder";
import { addEnumerations, asPluginWidgets, t } from "mendix/native";

import * as styles from "../styles.js";

const { $Placeholder } = asPluginWidgets({ Placeholder });

export const mainContent = (placeholder$Main) => [
    <$Placeholder key="l0.RNV.layoutr.Main"
        $widgetId="l0.RNV.layoutr.Main"
        content={placeholder$Main()} />
];

export const sidebar = () => null;

