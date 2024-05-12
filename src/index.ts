import type { ReactFlowState } from 'reactflow';
import { useReactFlow } from 'reactflow';
import * as ReactFlow from 'reactflow';


/**
 * You can use this hook to get the id of the node it is used inside.
 * It is useful if you need the node's id deeper in the render tree but don't want to manually drill down the id as a prop.
 *
 * @returns The id of the node the hook is used in.
 * @throws If the hook is not used inside a node or its children.
 */
export function useNodeId(): string | never {
    const nodeId = ReactFlow.useNodeId();

    if (nodeId === null) {
        throw new Error('Node ID is null. Make sure to call useNodeId() from a node or its children');
    }

    return nodeId;
}

/**
 * This hook returns the current node. Does **NOT** subscribe to node changes, see `useNodeState` for that.
 * It is useful if you need the node itself deeper in the render tree but don't want to manually drill down the node as a prop.
 *
 * @returns The node the hook is used in.
 * @throws If the hook is not used inside a node or its children.
 */
export function useNode<T = any>(): ReactFlow.Node<T> | never {
    const reactflow = useReactFlow<T>();
    const nodeId = useNodeId();
    const node = reactflow.getNode(nodeId);

    if (!node) {
        throw new Error(`Node with ID '${nodeId}' not found. Make sure to call useNode() from a node or its children`);
    }

    return node;
}

/**
 * This hook returns the current node's state.
 * It subscribes to node changes, so it will re-render the component when the selected state changes.
 *
 * @param selector The selector function to select a specific part of the node state.
 * @param equalityFn An optional equality function to compare the previous and current state. Defaults to `Object.is`.
 * @returns The selected part of the node state.
 * @throws If the hook is not used inside a node or its children.
 */
export function useNodeState<T = any, U = ReactFlow.Node<T>>(
    selector?: (node: ReactFlow.Node<T>) => U,
    equalityFn?: (a: U, b: U) => boolean,
): U | never {
    const nodeId = useNodeId();

    return ReactFlow.useStore(state => {
        const node = state.getNodes().find(n => n.id === nodeId);

        if (!node) {
            throw new Error(
                `Node with ID '${nodeId}' not found. Make sure to call useNodeState() from a node or its children`,
            );
        }

        return selector ? selector(node) : (node as U);
    }, equalityFn);
}

/**
 * A hook that subscribes specifically to the node's data.
 * The hook will re-render the component when the selected state changes.
 *
 * @param selector The selector function to select a specific part of the node data.
 * @param equalityFn An optional equality function to compare the previous and current state. Defaults to `Object.is`.
 * @returns The selected part of the node data.
 * @throws If the hook is not used inside a node or its children.
 */
export function useNodeData<T, U = T>(selector?: (data: T) => U, equalityFn?: (a: U, b: U) => boolean): U | never {
    return useNodeState(node => (selector ? selector(node.data) : (node.data as U)), equalityFn);
}

/**
 * Returns whether the specified input handle is connected given a reactflow state.
 *
 * @param state The reactflow state.
 * @param nodeId The id of the node.
 * @param inputId The id of the input handle.
 * @returns Whether the input handle is connected.
 */
export function isInputConnected(state: ReactFlowState, nodeId: string, inputId: string | null): boolean {
    return state.edges.some(edge => edge.target === nodeId && (edge.targetHandle ?? null) === inputId);
}

/**
 * Returns whether the specified output handle is connected given a reactflow state.
 *
 * @param state The reactflow state.
 * @param nodeId The id of the node.
 * @param outputId The id of the output handle.
 * @returns Whether the output handle is connected.
 */
export function isOutputConnected(state: ReactFlowState, nodeId: string, outputId: string | null): boolean {
    return state.edges.some(edge => edge.source === nodeId && (edge.sourceHandle ?? null) === outputId);
}

/**
 * Returns whether the specified handle is connected given a reactflow state.
 *
 * @param state The reactflow state.
 * @param nodeId The id of the node.
 * @param handleId The id of the handle.
 * @param handleType The type ("source" or "target") of the handle.
 * @returns Whether the handle is connected.
 */
export function isHandleConnected(
    state: ReactFlowState,
    nodeId: string,
    handleId: string | null,
    handleType: ReactFlow.HandleType,
): boolean {
    return handleType === 'target'
        ? isInputConnected(state, nodeId, handleId)
        : isOutputConnected(state, nodeId, handleId);
}

/**
 * A hook that returns whether the specified input handle of the current node is connected.
 * The hook will re-render the component when the connection state of the handle changes.
 *
 * @param inputId The id of the input handle.
 * @returns Whether the input handle is connected.
 * @throws If the hook is not used inside a node or its children.
 */
export function useIsInputConnected(inputId: string): boolean | never {
    const nodeId = useNodeId();
    return ReactFlow.useStore(state => isInputConnected(state, nodeId, inputId));
}

/**
 * A hook that returns whether the specified output handle of the current node is connected.
 * The hook will re-render the component when the connection state of the handle changes.
 *
 * @param outputId The id of the output handle.
 * @returns Whether the output handle is connected.
 * @throws If the hook is not used inside a node or its children.
 */
export function useIsOutputConnected(outputId: string): boolean | never {
    const nodeId = useNodeId();
    return ReactFlow.useStore(state => isOutputConnected(state, nodeId, outputId));
}

/**
 * A hook that returns whether the specified handle of the current node is connected.
 * The hook will re-render the component when the connection state of the handle changes.
 *
 * @param handleId The id of the handle.
 * @param handleType The type ("source" or "target") of the handle.
 * @returns Whether the handle is connected.
 * @throws If the hook is not used inside a node or its children.
 */
export function useIsHandleConnected(handleId: string, handleType: ReactFlow.HandleType): boolean | never {
    const nodeId = useNodeId();
    return ReactFlow.useStore(state => isHandleConnected(state, nodeId, handleId, handleType));
}
