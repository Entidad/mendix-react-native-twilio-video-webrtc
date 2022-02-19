import { createElement } from "react";
const React = { createElement };

import { AttributeProperty } from "mendix/AttributeProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { NanoflowObjectProperty } from "mendix/NanoflowObjectProperty";
import { StyleProperty } from "mendix/StyleProperty";
import { TextProperty } from "mendix/TextProperty";

import { ConditionalVisibilityWrapper } from "mendix/ConditionalVisibilityWrapper";
import { DataView } from "mendix/DataView";
import { entidad_io_rnv_Rnv } from "externalWidgets";
import { TextBox } from "mendix/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix/native";

import { mainContent, sidebar } from "C:/Users/ockert/src/entidad/mendix-react-native-twilio-video-webrtc/test/deployment/native/layouts/RNV.layoutr.js";

import * as styles from "../styles.js";

const { $DataView, $ConditionalVisibilityWrapper, $TextBox, $entidad_io_rnv_Rnv } = asPluginWidgets({ DataView, ConditionalVisibilityWrapper, TextBox, entidad_io_rnv_Rnv });

const placeholder$Main = () => [
    <$DataView key="p1.RNV.pgr_home.dataView1"
        $widgetId="p1.RNV.pgr_home.dataView1"
        style={StyleProperty({
            styles: [ styles.DataView ]
        })}
        object={NanoflowObjectProperty({
            dataSourceId: "p1.2",
            source: { "nanoflow": () => require("C:/Users/ockert/src/entidad/mendix-react-native-twilio-video-webrtc/test/deployment/native/nanoflows/RNV.nf_ds_ctx").nf_ds_ctx },
            argMap: {}
        })}
        content={[
            <$ConditionalVisibilityWrapper key="p1.RNV.pgr_home.textBox1$visibility"
                $widgetId="p1.RNV.pgr_home.textBox1$visibility"
                visible={ExpressionProperty({
                    expression: { "expr": { "type": "literal", "value": false }, "args": {} }
                })}
                contents={[
                    <$TextBox key="p1.RNV.pgr_home.textBox1"
                        $widgetId="p1.RNV.pgr_home.textBox1"
                        style={StyleProperty({
                            styles: [ styles.TextBox, styles.TextBoxVertical ]
                        })}
                        onEnter={undefined}
                        onLeave={undefined}
                        formOrientation={"vertical"}
                        labelWidth={0}
                        inputValue={AttributeProperty({
                            scope: "p1.RNV.pgr_home.dataView1",
                            path: "",
                            entity: "RNV.Ctx",
                            attribute: "RoomName",
                            onChange: { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            validation: null,
                            formatting: { }
                        })}
                        isPassword={false}
                        placeholder={TextProperty({
                            value: t([
                                ""
                            ])
                        })}
                        label={t([
                            ExpressionProperty({
                                expression: { "expr": { "type": "literal", "value": "Room name" }, "args": {} }
                            })
                        ])}
                        maxLength={200}
                        keyboardType={"default"}
                        onEnterKeyPress={undefined}
                        autocomplete={true}
                        submitWhileEditing={false}
                        submitDelay={300} />
                ]} />,
            <$ConditionalVisibilityWrapper key="p1.RNV.pgr_home.textBox3$visibility"
                $widgetId="p1.RNV.pgr_home.textBox3$visibility"
                visible={ExpressionProperty({
                    expression: { "expr": { "type": "literal", "value": false }, "args": {} }
                })}
                contents={[
                    <$TextBox key="p1.RNV.pgr_home.textBox3"
                        $widgetId="p1.RNV.pgr_home.textBox3"
                        style={StyleProperty({
                            styles: [ styles.TextBox, styles.TextBoxVertical ]
                        })}
                        onEnter={undefined}
                        onLeave={undefined}
                        formOrientation={"vertical"}
                        labelWidth={0}
                        inputValue={AttributeProperty({
                            scope: "p1.RNV.pgr_home.dataView1",
                            path: "",
                            entity: "RNV.Ctx",
                            attribute: "Ident",
                            onChange: { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            validation: null,
                            formatting: { }
                        })}
                        isPassword={false}
                        placeholder={TextProperty({
                            value: t([
                                ""
                            ])
                        })}
                        label={t([
                            ExpressionProperty({
                                expression: { "expr": { "type": "literal", "value": "Ident" }, "args": {} }
                            })
                        ])}
                        maxLength={undefined}
                        keyboardType={"default"}
                        onEnterKeyPress={undefined}
                        autocomplete={true}
                        submitWhileEditing={false}
                        submitDelay={300} />
                ]} />,
            <$ConditionalVisibilityWrapper key="p1.RNV.pgr_home.textBox2$visibility"
                $widgetId="p1.RNV.pgr_home.textBox2$visibility"
                visible={ExpressionProperty({
                    expression: { "expr": { "type": "literal", "value": false }, "args": {} }
                })}
                contents={[
                    <$TextBox key="p1.RNV.pgr_home.textBox2"
                        $widgetId="p1.RNV.pgr_home.textBox2"
                        style={StyleProperty({
                            styles: [ styles.TextBox, styles.TextBoxVertical ]
                        })}
                        onEnter={undefined}
                        onLeave={undefined}
                        formOrientation={"vertical"}
                        labelWidth={0}
                        inputValue={AttributeProperty({
                            scope: "p1.RNV.pgr_home.dataView1",
                            path: "",
                            entity: "RNV.Ctx",
                            attribute: "Tok",
                            onChange: { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            validation: null,
                            formatting: { }
                        })}
                        isPassword={false}
                        placeholder={TextProperty({
                            value: t([
                                ""
                            ])
                        })}
                        label={t([
                            ExpressionProperty({
                                expression: { "expr": { "type": "literal", "value": "Tok" }, "args": {} }
                            })
                        ])}
                        maxLength={undefined}
                        keyboardType={"default"}
                        onEnterKeyPress={undefined}
                        autocomplete={true}
                        submitWhileEditing={false}
                        submitDelay={300} />
                ]} />,
            <$entidad_io_rnv_Rnv key="p1.RNV.pgr_home.rnv1"
                $widgetId="p1.RNV.pgr_home.rnv1"
                roomname={AttributeProperty({
                    scope: "p1.RNV.pgr_home.dataView1",
                    path: "",
                    entity: "RNV.Ctx",
                    attribute: "RoomName",
                    onChange: { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                })}
                identity={AttributeProperty({
                    scope: "p1.RNV.pgr_home.dataView1",
                    path: "",
                    entity: "RNV.Ctx",
                    attribute: "Ident",
                    onChange: { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                })}
                token={AttributeProperty({
                    scope: "p1.RNV.pgr_home.dataView1",
                    path: "",
                    entity: "RNV.Ctx",
                    attribute: "Tok",
                    onChange: { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                })}
                style={StyleProperty({
                    styles: [ styles.entidad_io_rnv_Rnv ]
                })} />
        ]} />
];

export const $$title = t([
    "pgr home"
]);

export const $$style = [ styles.Layout, styles.Page ];

export const $$page = () => mainContent(placeholder$Main);

export const $$sidebar = () => sidebar(placeholder$Main);

