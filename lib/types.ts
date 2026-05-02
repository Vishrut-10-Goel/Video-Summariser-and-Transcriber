export interface Point {
  x: number;
  y: number;
}

export interface Node extends Point {
  id: string;
  heuristic?: number;
  gCost?: number;
  fCost?: number;
  parent?: Node;
  visited?: boolean;
  inPath?: boolean;
}

export interface AlgorithmStep {
  type: 'visit' | 'explore' | 'path' | 'blocked' | 'current' | 'reset';
  node: Node;
  metadata?: Record<string, any>;
  description?: string;
}

export interface AlgorithmResult {
  steps: AlgorithmStep[];
  path: Node[];
  visited: Set<string>;
  metrics: {
    nodesExplored: number;
    pathLength: number;
    executionTime: number;
  };
}

export type AlgorithmType = 'astar' | 'bfs' | 'dfs' | 'alphabeta' | 'nqueens' | 'prim' | 'kruskal' | 'knapsack01' | 'fractionalKnapsack' | 'lcs' | 'obst' | 'hamiltonianCycle' | 'huffman';

export const ALGORITHM_CONFIGS: Record<AlgorithmType, {
  name: string;
  description: string;
  complexity: { time: string; space: string };
  useCase: string;
  videoUrls: string[];
}> = {
  astar: {
    name: 'A* Algorithm',
    description: 'A* is a best-first search algorithm that uses heuristics to find the shortest path efficiently.',
    complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
    useCase: 'Pathfinding in games, GPS navigation, route optimization',
    videoUrls: ['https://youtu.be/iTG7NjQu0Qs?si=PsnA0u4xJolzUpwV'],
  },
  bfs: {
    name: 'Breadth-First Search (BFS)',
    description: 'BFS explores all nodes at the current depth level before moving to deeper levels.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    useCase: 'Shortest path in unweighted graphs, level-order traversal, social networks',
    videoUrls: ['https://youtu.be/pcKY4hjDrxk?si=J-fE53xbJdswvM_G', 'https://youtu.be/pcKY4hjDrxk?si=tHDF_5BuXk8eFxR_'],
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    description: 'DFS explores as far as possible along each branch before backtracking.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    useCase: 'Topological sorting, cycle detection, maze solving',
    videoUrls: ['https://youtu.be/xFv_Hl4B83A?si=zKeDHBeCqGxraquN'],
  },
  alphabeta: {
    name: 'Alpha-Beta Pruning',
    description: 'Alpha-Beta pruning optimizes minimax by eliminating branches that won\'t affect the decision.',
    complexity: { time: 'O(b^(d/2))', space: 'O(d)' },
    useCase: 'Game AI (chess, tic-tac-toe), decision trees, adversarial search',
    videoUrls: ['https://youtu.be/l-hh51ncgDI?si=jEQVAf4b6_v_YA1b'],
  },
  nqueens: {
    name: 'N-Queens Problem',
    description: 'Solves the constraint satisfaction problem of placing N queens on an N×N chessboard.',
    complexity: { time: 'O(N!)', space: 'O(N)' },
    useCase: 'Constraint satisfaction, backtracking problems, resource allocation',
    videoUrls: [],
  },
  prim: {
    name: "Prim's Algorithm",
    description: "Grow a Minimum Spanning Tree from a single starting node.",
    complexity: { time: 'O(E log V)', space: 'O(V)' },
    useCase: 'Network design (telephone, electricity), road construction',
    videoUrls: [],
  },
  kruskal: {
    name: "Kruskal's Algorithm",
    description: "Build a Minimum Spanning Tree by sorting and merging edges.",
    complexity: { time: 'O(E log E)', space: 'O(V + E)' },
    useCase: 'Telecommunications, airline route optimization',
    videoUrls: [],
  },
  knapsack01: {
    name: '0/1 Knapsack Problem',
    description: 'Select items with given weights and values to maximize total value without exceeding a weight capacity, where each item can be taken at most once.',
    complexity: { time: 'O(n·W)', space: 'O(n·W)' },
    useCase: 'Resource allocation, project selection, budget optimization',
    videoUrls: ['https://youtu.be/nLmhmB6NzcM?si=3G3jHOwA6JVWWJwi'],
  },
  fractionalKnapsack: {
    name: 'Fractional Knapsack Problem',
    description: 'Greedy algorithm to maximize value by taking fractions of items based on value-to-weight ratio.',
    complexity: { time: 'O(n log n)', space: 'O(1)' },
    useCase: 'Resource scheduling, stock cutting, continuous resource allocation',
    videoUrls: ['https://youtu.be/oTTzNMHM05I?si=YX5Wm-qJsudtpZlT'],
  },
  lcs: {
    name: 'Longest Common Subsequence (LCS)',
    description: 'Dynamic programming algorithm to find the longest subsequence common to two sequences.',
    complexity: { time: 'O(m·n)', space: 'O(m·n)' },
    useCase: 'Diff tools, DNA sequence analysis, version control systems',
    videoUrls: ['https://youtu.be/sSno9rV8Rhg?si=WJaCVwRN1EmWFhXC'],
  },
  obst: {
    name: 'Optimal Binary Search Tree (OBST)',
    description: 'Constructs a BST minimizing the expected search cost given key access probabilities.',
    complexity: { time: 'O(n³)', space: 'O(n²)' },
    useCase: 'Compiler symbol tables, database indexing, dictionary optimization',
    videoUrls: ['https://youtu.be/vLS-zRCHo-Y?si=rTcZk3x5ApATru0T'],
  },
  hamiltonianCycle: {
    name: 'Hamiltonian Cycle',
    description: 'Backtracking algorithm to find a cycle that visits every vertex exactly once in a graph.',
    complexity: { time: 'O(n!)', space: 'O(n)' },
    useCase: 'Travelling salesman, circuit board drilling, scheduling',
    videoUrls: ['https://youtu.be/dQr4wZCiJJ4?si=3oG8K8eK_PuMjn1L'],
  },
  huffman: {
    name: 'Huffman Coding',
    description: 'Greedy lossless data compression using variable-length prefix codes based on character frequencies.',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    useCase: 'File compression (ZIP, GZIP), JPEG/MP3 encoding, network transmission',
    videoUrls: ['https://youtu.be/co4_ahEDCho?si=Py6tK4oj1oEllkXF'],
  },
};
