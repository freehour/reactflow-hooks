# reactflow-hooks

Useful hooks for ReactFlow



### useAssertNodeId

A version of reactflow's `useNode` hook that throws an error if not called within a node instead of returning `null`.

```typescript
function useAssertNodeId(): string | never;
```

### useNode

A hook that returns the current node without subscribing to changes.

```typescript
function useNode<T = any>(): Node<T> | never;
```

### useNodeActions

A hook that returns actions that can be performed on the current node.

```typescript
interface NodeActions {
    deleteNode: () => void;
}

function useNodeActions<T = any>(): NodeActions<T> | never;
```

### useNodeState

A hook that subscribes to changes in the current node's state.

```typescript
function useNodeState<T = any, U = Node<T>>(
    selector?: (node: Node<T>) => U, 
    equalityFn?: (a: U, b: U) => boolean
): U | never;
```

### useNodeData

A hook that subscribes specifically to changes in the current node's data.

```typescript
function useNodeData<T, U = T>(
    selector?: (data: T) => U,
    equalityFn?: (a: U, b: U) => boolean
): U | never;
```

### useIngressEdges

A hook that returns the ingoing edges of the current node.

```typescript
function useIngressEdges<T = any>(): ReactFlow.Edge<T>[] | never;
```

### useEgressEdges

A hook that returns the outgoing edges of the current node.

```typescript
function useEgressEdges<T = any>(): ReactFlow.Edge<T>[] | never;
```

### useIsInputConnected

A subscribing hook that returns whether a given input handle of the current node is connected.

```typescript
function useIsInputConnected(inputId: string): boolean | never;
```

### useIsOutputConnected

A subscribing hook that returns whether a given output handle of the current node is connected.

```typescript
function useIsOutputConnected(outputId: string): boolean | never;
```

### useIsHandleConnected

A subscribing hook that returns whether a given handle of the current node is connected.

```typescript
function useIsHandleConnected(handleId: string, handleType: HandleType): boolean | never;
```

## Installation

### npm

```bash
npm install reactflow-hooks
```

### bun

```bash
bun install reactflow-hooks
```
