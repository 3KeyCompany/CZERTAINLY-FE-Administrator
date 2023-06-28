import { Edge, NodeProps } from "reactflow";

export enum FlowChartType {
    CERTIFICATE,
}

export interface OtherProperties {
    propertyName: string;
    propertyValue: string;
}

export interface CustomNodeData {
    entityType: string;
    entityLabel: string;
    redirectUrl?: string;
    icon?: string;
    handleHide?: "source" | "target";
    description?: string;
    otherProperties?: OtherProperties[];
}
export interface EntityNodeProps extends NodeProps {
    data: CustomNodeData;
}

export interface CustomNode extends Node {
    data: CustomNodeData;
}

export interface FlowChartProps {
    flowChartTitle?: string;
    flowChartNodes: CustomNode[];
    flowChartEdges: Edge[];
}