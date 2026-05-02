export const ALGORITHM_CONTENT = {
  astar: {
    name: 'A* Pathfinding Algorithm',
    category: 'Graph Search & Pathfinding',
    summary: {
      overview:
        'A* is an informed search algorithm that finds the shortest path between nodes in a graph. It uses a heuristic function to estimate the cost of reaching the goal, making it more efficient than uninformed search algorithms like BFS or Dijkstra.',
      keyPoints: [
        'Combines actual cost (g) with heuristic estimate (h) to calculate f = g + h',
        'Uses a priority queue to explore the most promising nodes first',
        'Guarantees optimal path if the heuristic is admissible',
        'Widely used in robotics, game AI, and GPS navigation',
        'Performance depends heavily on the quality of the heuristic function',
        'Maintains open and closed sets to avoid redundant exploration',
        'A consistent heuristic prevents unnecessary node reopening',
      ],
    },
    complexity: {
      time: 'O(b^d) where b is branching factor, d is depth',
      space: 'O(b^d)',
    },
    youtubeId: '4ZlRH0eK-qQ',
    flashcards: [
      {
        question: 'What does f(n) = g(n) + h(n) represent in A*?',
        answer:
          'f(n) is the estimated total cost of the path through node n. g(n) is the actual cost from start to n, and h(n) is the heuristic estimate from n to goal.',
      },
      {
        question: 'What property must a heuristic have for A* to find optimal solutions?',
        answer:
          'The heuristic must be admissible, meaning it never overestimates the actual cost to reach the goal from any node.',
      },
      {
        question: 'How does A* differ from Dijkstra algorithm?',
        answer:
          'A* uses a heuristic function h(n) to guide search, while Dijkstra explores nodes purely based on their distance from start. A* is faster when a good heuristic is available.',
      },
      {
        question: 'Why is A* efficient compared to BFS?',
        answer:
          'A* prioritizes nodes based on their estimated total cost, avoiding exploration of many unnecessary nodes that BFS would explore.',
      },
      {
        question: 'What is the open set in A* and why is it important?',
        answer:
          'The open set is a priority queue of nodes to be evaluated. It ensures we always explore the most promising node next, based on the f-cost.',
      },
    ],
    animations: [
      {
        title: 'Heuristic Calculation',
        description:
          'See how the heuristic function estimates distance to goal. Uses Manhattan distance for grid-based problems.',
      },
      {
        title: 'Node Expansion',
        description: 'Watch as A* expands nodes in order of their f-cost, exploring the most promising paths first.',
      },
      {
        title: 'Path Reconstruction',
        description: 'See how the algorithm backtraces from goal to start to reconstruct the optimal path.',
      },
    ],
    quiz: [
      {
        question: 'In A*, which node is selected for expansion?',
        options: [
          'The node with the lowest g(n)',
          'The node with the lowest f(n)',
          'The node with the lowest h(n)',
          'The first node added to open set',
        ],
        correctAnswer: 1,
        explanation: 'A* always selects the node with the lowest f(n) = g(n) + h(n) from the open set, ensuring it explores the most promising nodes first.',
      },
      {
        question: 'What happens if your heuristic overestimates the cost to goal?',
        options: [
          'A* will still find optimal path but slower',
          'A* may find suboptimal path',
          'A* will not find any path',
          'A* will find path faster',
        ],
        correctAnswer: 1,
        explanation: 'An overestimating (inadmissible) heuristic can cause A* to miss the optimal path and find a suboptimal one instead.',
      },
      {
        question: 'Which heuristic is admissible for grid pathfinding?',
        options: ['Euclidean distance', 'Manhattan distance', 'Chebyshev distance', 'All of the above'],
        correctAnswer: 3,
        explanation: 'All three distances are admissible for grid pathfinding, but Manhattan distance is often preferred as it better matches the actual movement cost on grids.',
      },
      {
        question: 'What happens to A* if the heuristic h(n) is always 0?',
        options: [
          'It becomes Depth-First Search',
          'It becomes Dijkstra\'s Algorithm',
          'It runs in O(1) time',
          'It cannot find the target'
        ],
        correctAnswer: 1,
        explanation: 'If h(n) = 0 for all nodes, then f(n) = g(n), meaning A* perfectly mirrors Dijkstra\'s algorithm by only evaluating distance from the start node.'
      },
      {
        question: 'What does a "consistent" (or monotonic) heuristic guarantee in A*?',
        options: [
          'Nodes never have to be re-expanded once placed in the closed set',
          'The algorithm uses 50% less memory',
          'The path is found instantly without exploring',
          'The branching factor is reduced to 1'
        ],
        correctAnswer: 0,
        explanation: 'A consistent heuristic ensures that the first path found to any node is strictly the shortest one. This guarantees we can safely ignore any nodes once they go into the closed set.'
      },
    ],
    importantContent: [
      {
        title: 'Real-World Applications',
        content:
          'A* is fundamental in GPS navigation, video game AI, robotics path planning, and network routing. Its ability to balance optimality with efficiency makes it the standard choice for many pathfinding problems.',
      },
      {
        title: 'Heuristic Selection',
        content:
          'Choosing the right heuristic is crucial. Common heuristics include Manhattan distance (for grid), Euclidean distance, and Chebyshev distance. A good heuristic should be admissible and as close to actual cost as possible.',
      },
      {
        title: 'Memory Efficiency',
        content:
          'A* stores many nodes in memory during search. For very large spaces, variants like IDA* (Iterative Deepening A*) can reduce memory usage while maintaining optimality.',
      },
      {
        title: 'When A* Becomes Expensive',
        content:
          'A* can slow down when the branching factor is high or when the heuristic is weak. In those cases, it behaves closer to Dijkstra and explores much more of the search space.',
      },
      {
        title: 'Open vs Closed Set',
        content:
          'The open set tracks frontier nodes that may lead to a good solution, while the closed set tracks already-expanded states. Understanding this distinction is essential for debugging pathfinding implementations.',
      },
    ],
    pseudocode: `Initialize openSet with startNode
While openSet is not empty:
  currentNode = node in openSet with lowest fScore
  If currentNode is goal: return reconstructPath(currentNode)
  Remove currentNode from openSet
  Add currentNode to closedSet
  For each neighbor of currentNode:
    If neighbor in closedSet: continue
    tentative_gScore = gScore[currentNode] + distance(currentNode, neighbor)
    If neighbor not in openSet or tentative_gScore < gScore[neighbor]:
      neighbor.parent = currentNode
      gScore[neighbor] = tentative_gScore
      fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
      If neighbor not in openSet: add neighbor to openSet`,
    realWorldApplications: [
      {
        icon: '🗺️',
        industry: 'Navigation & Mapping',
        title: 'GPS Route Optimization',
        description: 'Powers real-time shortest path calculation in Google Maps, Waze, and Apple Maps for hundreds of millions of daily users, dynamically re-routing around traffic and road closures.',
        impact: 'Reduces average commute time by 15–25% through optimal route selection over live map graphs with millions of nodes.',
      },
      {
        icon: '🎮',
        industry: 'Video Game Development',
        title: 'NPC Pathfinding (Unity NavMesh)',
        description: 'Every enemy, ally, or NPC moving intelligently on a game map — from open-world RPGs to real-time strategy — uses A* on a navigation mesh to find obstacle-avoiding paths from point A to B.',
        impact: 'Enables believable AI movement in AAA titles like The Witcher, Starcraft II, and most modern game engines at 60+ FPS.',
      },
      {
        icon: '🤖',
        industry: 'Robotics & Automation',
        title: 'Autonomous Robot Navigation',
        description: 'Warehouse robots (Amazon Kiva/Proteus), surgical robots, and self-driving vehicles use A* on occupancy grids to plan collision-free paths from origin to destination in real time.',
        impact: 'Amazon deploys 500,000+ robots in fulfillment centers, each using pathfinding algorithms to pick and deliver packages in under 15 minutes.',
      },
      {
        icon: '🌐',
        industry: 'Computer Networks',
        title: 'IS-IS and OSPF Routing Protocols',
        description: 'Network routers use A*-family algorithms to find least-cost paths through internet backbone networks, considering latency, bandwidth, and hop count as heuristic cost components.',
        impact: 'Determines how terabits of internet traffic per second are routed across global infrastructure with sub-millisecond decisions.',
      },
      {
        icon: '🏭',
        industry: 'Logistics & Supply Chain',
        title: 'Drone Delivery Path Planning',
        description: 'Drone delivery systems (Amazon Prime Air, Zipline medical deliveries) use 3D A* to navigate airspace, avoiding no-fly zones, buildings, and weather while minimizing battery consumption.',
        impact: 'Zipline has delivered 700,000+ medical packages in Rwanda and Ghana using A*-based flight path optimization.',
      },
    ],
  },
  bfs: {
    name: 'Breadth-First Search (BFS)',
    category: 'Graph Search & Traversal',
    summary: {
      overview:
        'BFS is an uninformed search algorithm that explores all nodes at the present depth level before moving to nodes at the next depth level. It uses a queue data structure and guarantees finding the shortest path in unweighted graphs.',
      keyPoints: [
        'Explores nodes level by level using a First-In-First-Out (FIFO) queue',
        'Finds shortest path in terms of number of edges for unweighted graphs',
        'Complete algorithm - always finds a solution if one exists',
        'Memory intensive as it stores all nodes at current level',
        'Used in social networks, maze solving, and level-by-level analysis',
        'Naturally computes node distance from the source during traversal',
        'A visited set is essential to prevent reprocessing nodes in cyclic graphs',
      ],
    },
    complexity: {
      time: 'O(V + E) where V is vertices, E is edges',
      space: 'O(V)',
    },
    youtubeId: 'pcKY4hjDrxk',
    flashcards: [
      {
        question: 'What data structure does BFS use?',
        answer: 'BFS uses a Queue (FIFO) data structure to maintain the order of nodes to explore.',
      },
      {
        question: 'Why does BFS find the shortest path in unweighted graphs?',
        answer:
          'BFS explores all nodes at distance k before exploring nodes at distance k+1, guaranteeing the first path found is shortest.',
      },
      {
        question: 'What is the main disadvantage of BFS?',
        answer: 'BFS requires significant memory as it must store all nodes at the current depth level, especially for wide graphs.',
      },
      {
        question: 'Is BFS optimal for weighted graphs?',
        answer: 'No, BFS does not account for edge weights and may not find the shortest path in weighted graphs.',
      },
      {
        question: 'Name three applications of BFS.',
        answer: 'Social network friend suggestions, maze solving, Web crawling, garbage collection in memory management.',
      },
    ],
    animations: [
      {
        title: 'Queue Operations',
        description: 'Visualize how nodes are added to and removed from the queue during exploration.',
      },
      {
        title: 'Level-by-Level Exploration',
        description: 'See how BFS systematically explores all nodes at each depth level.',
      },
      {
        title: 'Shortest Path Discovery',
        description: 'Watch as BFS discovers the shortest path to the goal node.',
      },
    ],
    quiz: [
      {
        question: 'What is the time complexity of BFS?',
        options: ['O(log V)', 'O(V)', 'O(V + E)', 'O(V * E)'],
        correctAnswer: 2,
        explanation: 'BFS visits each vertex once and examines each edge once, so its time complexity is O(V + E) where V is the number of vertices and E is the number of edges.',
      },
      {
        question: 'When would you choose BFS over DFS?',
        options: [
          'When you want to minimize memory usage',
          'When you need the shortest path in unweighted graphs',
          'When exploring very deep graphs',
          'When you want faster execution',
        ],
        correctAnswer: 1,
        explanation: 'BFS is ideal when you need to find the shortest path in unweighted graphs, as it explores level-by-level and guarantees the shortest path.',
      },
      {
        question: 'Can BFS handle graphs with cycles?',
        options: ['No, it will loop infinitely', 'Yes, using a visited set', 'Only with small cycles', 'Only undirected graphs'],
        correctAnswer: 1,
        explanation: 'BFS can handle cycles by maintaining a visited set to mark nodes that have been processed, preventing infinite loops.',
      },
      {
        question: 'If a graph is completely unweighted, which shortest path algorithm is most optimal?',
        options: [
          'Dijkstra\'s Algorithm',
          'A* Search',
          'Breadth-First Search',
          'Depth-First Search'
        ],
        correctAnswer: 2,
        explanation: 'BFS is logically the fastest shortest-path solver for unweighted graphs because it inherently checks length 1, then length 2, then length 3, taking O(V+E) time without overhead of priority queues.'
      },
      {
        question: 'In terms of spatial structure, how does BFS conceptually expand?',
        options: [
          'As a narrow, piercing laser',
          'As a randomly bouncing ray',
          'As an expanding concentric sphere or ripple',
          'As a fractal pattern'
        ],
        correctAnswer: 2,
        explanation: 'BFS expands symmetrically from the start node outward in all accessible directions equally, resembling a ripple traveling across a pond.'
      },
    ],
    importantContent: [
      {
        title: 'Shortest Path Property',
        content:
          'BFS guarantees finding the shortest path in unweighted graphs. This is because it explores nodes in order of their distance from the start, so the first path to the goal is always shortest.',
      },
      {
        title: 'Memory vs Speed Trade-off',
        content:
          'While BFS guarantees shortest path, it uses more memory than DFS. Choose based on your problem constraints: if memory is limited, use DFS; if you need shortest path, use BFS.',
      },
      {
        title: 'Connected Components',
        content:
          'BFS can be used to find all connected components in a graph and to perform bipartite checking by coloring nodes.',
      },
      {
        title: 'Layered Exploration',
        content:
          'Because BFS expands one layer at a time, it is ideal when the meaning of distance is “fewest edges” rather than lowest weighted cost.',
      },
      {
        title: 'Queue Discipline Matters',
        content:
          'BFS is correct because it strictly processes nodes in FIFO order. Replacing the queue with another structure changes the traversal behaviour entirely.',
      },
    ],
    pseudocode: `Initialize queue with startNode
Mark startNode as visited
While queue is not empty:
  currentNode = queue.dequeue()
  If currentNode is goal: return path
  For each neighbor of currentNode:
    If neighbor not visited:
      Mark neighbor as visited
      neighbor.parent = currentNode
      queue.enqueue(neighbor)`,
    realWorldApplications: [
      {
        icon: '👥',
        industry: 'Social Networks',
        title: 'Degree of Connection (LinkedIn / Facebook)',
        description: 'LinkedIn\'s "2nd-degree connections" and Facebook Messenger\'s "People You May Know" use BFS to find friends-of-friends starting from your profile and expanding level by level.',
        impact: 'LinkedIn processes this across a 900M+ node graph in real time, surfacing actionable connection recommendations.',
      },
      {
        icon: '🕷️',
        industry: 'Search Engines',
        title: 'Web Crawling (Googlebot)',
        description: 'Google\'s web crawler discovers new pages by performing BFS from known seed URLs — visiting all links on a page (level 1), then all links on those pages (level 2), and so on.',
        impact: 'Indexes over 130 trillion web pages, with BFS ensuring physically closer and more relevant pages are discovered first.',
      },
      {
        icon: '📡',
        industry: 'Computer Networks',
        title: 'Spanning Tree Protocol (STP)',
        description: 'Network switches use BFS to build a loop-free topology in Ethernet networks. STP elects a root bridge and constructs a BFS spanning tree to prevent broadcast storms.',
        impact: 'Runs in every enterprise switch globally, preventing network outages caused by Layer 2 loops in data centers.',
      },
      {
        icon: '🧬',
        industry: 'Bioinformatics',
        title: 'Protein Contact Network Analysis',
        description: 'BFS is used to find shortest paths between amino-acid residues in protein contact networks, helping identify functional regions and allosteric communication pathways in 3D protein structures.',
        impact: 'Accelerates drug-target identification by mapping communication channels in proteins like SARS-CoV-2 spike protein.',
      },
      {
        icon: '🚒',
        industry: 'Emergency Services',
        title: 'Nearest Emergency Unit Dispatch',
        description: 'Dispatch systems use BFS on city road graphs to find the nearest available fire truck, ambulance, or police unit to any emergency location ignoring edge weights for fast first-response.',
        impact: 'Reduces response time by instantly computing the fewest-turns route rather than waiting for weighted shortest-path algorithms.',
      },
    ],
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    category: 'Graph Search & Traversal',
    summary: {
      overview:
        'DFS is an uninformed search algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) and is useful for topological sorting, detecting cycles, and exploring connected components.',
      keyPoints: [
        'Explores deep into branches before backtracking using a Last-In-First-Out (LIFO) stack',
        'Memory efficient compared to BFS, stores only nodes on current path',
        'Does not guarantee shortest path but explores entire search space',
        'Used for topological sorting, cycle detection, and SCC finding',
        'Can be implemented recursively or iteratively with explicit stack',
        'Backtracking order strongly affects the exact traversal sequence',
        'DFS is often the base routine inside more advanced graph algorithms',
      ],
    },
    complexity: {
      time: 'O(V + E)',
      space: 'O(V) for recursion stack',
    },
    youtubeId: 'pcKY4hjDrxk',
    flashcards: [
      {
        question: 'What data structure does DFS use?',
        answer: 'DFS uses a Stack (LIFO) data structure, either explicitly or implicitly through recursion.',
      },
      {
        question: 'Why is DFS more memory efficient than BFS?',
        answer:
          'DFS only stores the current path from root to current node, while BFS stores all nodes at the current level.',
      },
      {
        question: 'What are the pre-order, in-order, and post-order traversals?',
        answer:
          'Pre-order: process node before children. In-order: process left child, node, right child. Post-order: process children before node.',
      },
      {
        question: 'How can DFS detect cycles in a graph?',
        answer:
          'During DFS, if we encounter a back edge (edge to an ancestor), a cycle exists. This is tracked using colors: white (unvisited), gray (visiting), black (visited).',
      },
      {
        question: 'What is a topological sort and when is it useful?',
        answer:
          'Topological sort is a linear ordering of vertices where every edge goes from earlier to later vertex. Used for task scheduling and dependency resolution.',
      },
    ],
    animations: [
      {
        title: 'Stack Operations',
        description: 'Watch nodes being pushed to and popped from the stack during DFS traversal.',
      },
      {
        title: 'Backtracking',
        description: 'See how DFS backtracks when reaching dead ends and explores alternative branches.',
      },
      {
        title: 'Cycle Detection',
        description: 'Observe how DFS identifies cycles by tracking visited and currently visiting nodes.',
      },
    ],
    quiz: [
      {
        question: 'What is the main advantage of DFS over BFS?',
        options: [
          'DFS finds shortest path',
          'DFS uses less memory',
          'DFS is faster',
          'DFS works on weighted graphs',
        ],
        correctAnswer: 1,
        explanation: 'DFS uses less memory than BFS because it only needs to store the nodes on the current path from root to the current node, not all nodes at a level.',
      },
      {
        question: 'When is DFS particularly useful?',
        options: [
          'Finding shortest paths',
          'Detecting cycles and doing topological sorts',
          'Breadth-level analysis',
          'Finding bipartite graphs',
        ],
        correctAnswer: 1,
        explanation: 'DFS is particularly useful for cycle detection and topological sorting of DAGs, which are essential for many real-world applications.',
      },
      {
        question: 'What color represents a node currently being explored in DFS?',
        options: ['White', 'Gray', 'Black', 'Red'],
        correctAnswer: 1,
        explanation: 'In the DFS coloring scheme: White = unvisited, Gray = currently visiting, Black = completely explored. Gray nodes represent the current exploration path.',
      },
      {
        question: 'Can DFS be used to find the shortest path in an unweighted graph?',
        options: [
          'Yes, it is optimal for shortest paths',
          'No, it does not guarantee the shortest path',
          'Only if the graph is a tree',
          'Only if the graph is directed'
        ],
        correctAnswer: 1,
        explanation: 'DFS explores deep along a single branch blindly. It might find a path, but it is rarely the shortest path because it does not stop to check closer neighboring alternatives first.'
      },
      {
        question: 'Which of the following problems is traditionally solved using DFS?',
        options: [
          'Finding the nearest neighbor in social network friends',
          'Topological Sorting of a DAG',
          'Finding the shortest path out of a maze',
          'Simulating rippling water'
        ],
        correctAnswer: 1,
        explanation: 'Topological sort uses DFS specifically because we can recursively dig to the deep dependencies, finishing leaf nodes first, and pushing them to a stack.'
      },
    ],
    importantContent: [
      {
        title: 'Topological Sorting',
        content:
          'DFS is the foundation for topological sorting of DAGs (Directed Acyclic Graphs). This is crucial for task scheduling, build systems, and course prerequisite planning.',
      },
      {
        title: 'Cycle Detection',
        content:
          'By tracking node colors (white/gray/black), DFS can efficiently detect cycles in directed graphs - essential for identifying issues in dependency graphs.',
      },
      {
        title: 'Connected Components & SCCs',
        content:
          'DFS can find connected components in undirected graphs and Strongly Connected Components (SCCs) in directed graphs using algorithms like Kosaraju or Tarjan.',
      },
      {
        title: 'Recursive vs Iterative DFS',
        content:
          'Recursive DFS is concise and expressive, but iterative DFS gives you direct control over the stack and avoids recursion-depth problems on very large inputs.',
      },
      {
        title: 'Traversal Order',
        content:
          'DFS does not have one fixed output order. The traversal depends on the order in which neighbors are stored and visited, which can affect debugging and classroom examples.',
      },
    ],
    pseudocode: `Initialize stack with startNode
While stack is not empty:
  currentNode = stack.pop()
  If currentNode not visited:
    Mark currentNode as visited
    If currentNode is goal: return path
    For each neighbor of currentNode:
      stack.push(neighbor)`,
    realWorldApplications: [
      {
        icon: '🔨',
        industry: 'Build Systems & Compilers',
        title: 'Dependency Resolution (npm, Make, Maven)',
        description: 'Package managers and build tools use DFS-based topological sort to resolve dependency ordering — ensuring library A is compiled before library B that depends on it.',
        impact: 'npm runs DFS on dependency trees with millions of packages to correctly sequence installs without circular dependency errors.',
      },
      {
        icon: '🗑️',
        industry: 'Runtime Systems',
        title: 'Garbage Collection (Mark & Sweep)',
        description: 'The JVM, Python, and V8 JavaScript engine use DFS to traverse object reference graphs. Starting from "root" objects, DFS marks all reachable objects; unmarked objects are swept (freed).',
        impact: 'Prevents memory leaks in billions of running applications — DFS is the core of every managed language\'s memory management.',
      },
      {
        icon: '🎲',
        industry: 'Game Development',
        title: 'Procedural Maze & Dungeon Generation',
        description: 'DFS (Recursive Backtracking) is the leading algorithm for generating mazes and dungeon layouts in games. It carves a winding path through a grid, creating complex but always-solvable mazes.',
        impact: 'Used in Minecraft cave generation, Spelunky level generation, and countless roguelike games to create infinite unique environments.',
      },
      {
        icon: '🔍',
        industry: 'Static Code Analysis',
        title: 'Cycle Detection in Dependency Graphs',
        description: 'IDEs and linters use DFS with gray/white/black node coloring to detect circular imports in Python, circular references in Java, or cyclic dependencies in microservice architectures.',
        impact: 'Tools like ESLint, Pylint, and IntelliJ detect thousands of circular dependency bugs before production, saving hours of debugging.',
      },
      {
        icon: '🌐',
        industry: 'Networking',
        title: 'Strongly Connected Component (SCC) Detection',
        description: 'Kosaraju\'s and Tarjan\'s SCC algorithms (both DFS-based) analyse web link graphs to find groups of mutually reachable pages — the basis of Google\'s PageRank clustering.',
        impact: 'Facebook uses SCC-like DFS to identify "echo chambers" and community clusters in its social graph of 3B+ users.',
      },
    ],
  },
  alphabeta: {
    name: 'Alpha-Beta Pruning',
    category: 'Game Theory & Optimization',
    summary: {
      overview:
        'Alpha-Beta Pruning is an optimization technique for the Minimax algorithm used in game playing. It eliminates branches that do not affect the final decision, dramatically reducing the number of nodes evaluated in the game tree.',
      keyPoints: [
        'Maintains alpha (best value for maximizer) and beta (best value for minimizer)',
        'Prunes branches when alpha >= beta, eliminating unnecessary evaluation',
        'Reduces search complexity from O(b^d) to O(b^(d/2)) in best case',
        'Optimal move ordering can lead to near-optimal pruning',
        'Fundamental algorithm in chess engines, checkers, and other game AIs',
        'Produces the same final decision as minimax, but with less search',
        'Works best when promising moves are evaluated earlier in the search',
      ],
    },
    complexity: {
      time: 'O(b^(d/2)) best case, O(b^d) worst case',
      space: 'O(d) for recursion stack',
    },
    youtubeId: 'l-hh51ncgDI',
    flashcards: [
      {
        question: 'What is the difference between alpha and beta in Alpha-Beta Pruning?',
        answer:
          'Alpha is the best value found so far for the maximizer (lower bound), beta is the best value found so far for the minimizer (upper bound).',
      },
      {
        question: 'When does pruning occur in Alpha-Beta algorithm?',
        answer: 'Pruning occurs when alpha >= beta. At this point, the current branch cannot affect the final decision, so we stop exploring it.',
      },
      {
        question: 'How much does Alpha-Beta Pruning improve over Minimax?',
        answer:
          'In the best case with optimal move ordering, it reduces complexity from O(b^d) to O(b^(d/2)), allowing doubling of search depth with same computation.',
      },
      {
        question: 'Why is move ordering important in Alpha-Beta Pruning?',
        answer:
          'Good move ordering (evaluating strong moves first) leads to more pruning. Poor ordering may result in minimal pruning.',
      },
      {
        question: 'What is a transposition table in game engines?',
        answer:
          'A cache that stores previously evaluated positions to avoid re-computing the same game states, especially important when combined with Alpha-Beta Pruning.',
      },
    ],
    animations: [
      {
        title: 'Tree Expansion',
        description: 'Watch as the game tree is built level by level during Alpha-Beta search.',
      },
      {
        title: 'Pruning in Action',
        description: 'See branches being pruned when alpha >= beta condition is met.',
      },
      {
        title: 'Score Propagation',
        description: 'Observe how min and max values propagate up the tree during evaluation.',
      },
    ],
    quiz: [
      {
        question: 'In Alpha-Beta Pruning, who benefits from alpha and who from beta?',
        options: [
          'Alpha for maximizer, beta for minimizer',
          'Alpha for minimizer, beta for maximizer',
          'Both use both',
          'Only the maximizer uses them',
        ],
      },
      {
        question: 'What is the best-case time complexity of Alpha-Beta Pruning?',
        options: ['O(b^d)', 'O(b^(d/2))', 'O(log b)', 'O(d)'],
        correctAnswer: 1,
        explanation: 'With perfect move ordering, Alpha-Beta Pruning reduces the complexity to O(b^(d/2)), which is exponentially better than minimax O(b^d).',
      },
      {
        question: 'How can you improve Alpha-Beta Pruning performance?',
        options: [
          'Increase search depth',
          'Improve move ordering',
          'Remove transposition table',
          'Use smaller branching factor',
        ],
        correctAnswer: 1,
        explanation: 'Improving move ordering is crucial for Alpha-Beta Pruning effectiveness. Exploring promising moves first leads to more pruning and better performance.',
      },
      {
        question: 'What is the absolute maximum pruning Alpha-Beta can achieve compared to raw minimax?',
        options: [
          'It evaluates exactly half the branches',
          'It evaluates the same branches but faster',
          'It evaluates O(b^(d/2)) nodes instead of O(b^d)',
          'It avoids searching completely'
        ],
        correctAnswer: 2,
        explanation: 'In the mathematical best-case scenario (perfect order), Alpha-Beta evaluates O(b^(d/2)) nodes. This literally allows game engines to look twice as many turns ahead in the same amount of time.'
      },
      {
        question: 'A branch evaluates to a lower score than alpha (the maximizer\'s guaranteed minimum). What happens?',
        options: [
          'The algorithm prunes the branch',
          'The algorithm ignores the branch but continues looking',
          'Alpha gets updated to the lower score',
          'Beta gets updated'
        ],
        correctAnswer: 1,
        explanation: 'If a branch yields a score below Alpha, the Maximizer already knows a better path elsewhere, so it just ignores this sub-optimal branch move and keeps searching horizontally.'
      },
    ],
    importantContent: [
      {
        title: 'Game AI Foundation',
        content:
          'Alpha-Beta Pruning is the backbone of classical game-playing AI. It enables engines like Stockfish to evaluate millions of positions per second by intelligently pruning the search tree.',
      },
      {
        title: 'Move Ordering Impact',
        content:
          'The effectiveness of Alpha-Beta depends heavily on move ordering. In the worst case with bad ordering, no pruning occurs. Good heuristics for move ordering are crucial for performance.',
      },
      {
        title: 'Modern Enhancements',
        content:
          'Modern game engines combine Alpha-Beta Pruning with transposition tables, iterative deepening, killer move heuristics, and history heuristics to achieve optimal pruning.',
      },
      {
        title: 'Why Pruning Is Safe',
        content:
          'A branch is pruned only when the current player already has a better guaranteed option elsewhere. That means exploring the branch cannot improve the final decision.',
      },
      {
        title: 'Relationship to Minimax',
        content:
          'Alpha-Beta is not a different decision rule from minimax. It is a smarter way to compute the same answer by skipping branches that cannot change the outcome.',
      },
    ],
    pseudocode: `function minimax(node, depth, alpha, beta, isMaximizing):
  if depth == 0 or node is terminal:
    return evaluation(node)
  
  if isMaximizing:
    maxEval = -infinity
    for each child of node:
      eval = minimax(child, depth-1, alpha, beta, false)
      maxEval = max(maxEval, eval)
      alpha = max(alpha, eval)
      if beta <= alpha: break
    return maxEval
  else:
    minEval = +infinity
    for each child of node:
      eval = minimax(child, depth-1, alpha, beta, true)
      minEval = min(minEval, eval)
      beta = min(beta, eval)
      if beta <= alpha: break
    return minEval`,
    realWorldApplications: [
      {
        icon: '♟️',
        industry: 'Chess & Board Games',
        title: 'Stockfish Chess Engine',
        description: 'Stockfish, the world\'s strongest open-source chess engine, uses Alpha-Beta Pruning with iterative deepening to evaluate up to 70 million positions per second, pruning branches where the optimal outcome is already guaranteed.',
        impact: 'Rated 3500+ ELO — far beyond the best human grandmasters (2800 ELO). Powers analysis on Chess.com for 100M+ users.',
      },
      {
        icon: '💹',
        industry: 'Finance & Trading',
        title: 'Adversarial Options Pricing Trees',
        description: 'Quantitative analysts model options using binomial trees where the market (minimizer) and trader (maximizer) make alternating decisions. Alpha-Beta prunes unprofitable branches in multi-step derivatives pricing.',
        impact: 'Reduces computation from O(2^n) to near O(2^(n/2)), enabling real-time pricing of complex structured products.',
      },
      {
        icon: '🛡️',
        industry: 'Cybersecurity',
        title: 'Adversarial Attack Path Planning',
        description: 'Security frameworks model penetration testing as a two-player game: the attacker (maximizer) finds the best exploit path, the defender (minimizer) patches vulnerabilities. Alpha-Beta identifies the highest-risk attack paths.',
        impact: 'Used in automated red-team tools to simulate sophisticated multi-step cyberattacks during enterprise security assessments.',
      },
      {
        icon: '🤖',
        industry: 'AI & Game Theory',
        title: 'Real-Time Strategy (RTS) Game AI',
        description: 'In games like StarCraft and Age of Empires, AI units use Alpha-Beta to choose tactical battle decisions — attack, retreat, flank — by modeling the opponent as a rational minimizer up to a horizon depth.',
        impact: 'DeepMind\'s AlphaStar defeated human pros partly by combining Alpha-Beta search with neural network evaluation functions.',
      },
      {
        icon: '🏥',
        industry: 'Healthcare AI',
        title: 'Treatment Planning Optimization',
        description: 'Medical decision trees modelling disease progression vs. treatment outcomes use minimax-style reasoning to find treatment sequences that maximize patient recovery even under worst-case disease responses.',
        impact: 'Applied in cancer treatment planning software to select radiation dose sequences that minimize tumor cells while protecting healthy tissue.',
      },
    ],
  },
  nqueens: {
    name: 'N-Queens Problem',
    category: 'Constraint Satisfaction',
    summary: {
      overview:
        'The N-Queens problem is a classic constraint satisfaction problem where N queens must be placed on an N×N chessboard such that no two queens attack each other. It is solved using backtracking and explores the solution space systematically.',
      keyPoints: [
        'No two queens can be in the same row, column, or diagonal',
        'Backtracking algorithm tries placements and backtracks when constraints violated',
        'Has 92 solutions for N=8, exponential growth with N',
        'Used to teach constraint satisfaction and backtracking algorithms',
        'Key to understanding NP-complete problems and exhaustive search',
        'A partial placement can already prove an entire branch impossible',
        'Diagonal bookkeeping is the main optimization in practical solvers',
      ],
    },
    complexity: {
      time: 'O(N!) in worst case due to exploring permutations',
      space: 'O(N) for recursion stack and board representation',
    },
    youtubeId: 'xSIfsjdPr08',
    flashcards: [
      {
        question: 'What constraints must be satisfied in the N-Queens problem?',
        answer:
          'No two queens can share the same row, column, or diagonal. For N queens on N×N board.',
      },
      {
        question: 'Why is backtracking suitable for N-Queens?',
        answer:
          'Backtracking allows us to abandon partial solutions early when constraints are violated, avoiding exploration of entire subtrees.',
      },
      {
        question: 'How many solutions exist for the 8-Queens problem?',
        answer: '92 fundamental solutions (44 unique if symmetry is considered).',
      },
      {
        question: 'How do you check if two queens attack each other diagonally?',
        answer:
          'Queens at (row1, col1) and (row2, col2) attack diagonally if |row1 - row2| == |col1 - col2|.',
      },
      {
        question: 'What is the time complexity of solving N-Queens?',
        answer: 'O(N!) in the worst case, as we explore permutations of queen placements.',
      },
    ],
    animations: [
      {
        title: 'Queen Placement',
        description: 'Watch as queens are placed on the board row by row, checking constraints.',
      },
      {
        title: 'Constraint Checking',
        description:
          'Observe how diagonal, row, and column constraints are checked before each placement.',
      },
      {
        title: 'Backtracking',
        description:
          'See how the algorithm removes queens and backtracks when no valid placement exists.',
      },
    ],
    quiz: [
      {
        question: 'What is the key insight that makes N-Queens solvable for large N?',
        options: [
          'Greedy approach always works',
          'Backtracking eliminates invalid branches early',
          'Queens always attack each other',
          'There are always N solutions',
        ],
        correctAnswer: 1,
        explanation: 'Backtracking is crucial because it prunes entire search branches early when a constraint is violated, avoiding exponential explosion of possibilities.',
      },
      {
        question: 'For 8-Queens, how many possible placements are there without constraints?',
        options: ['8!', '8^8', '64 choose 8', 'None of above'],
        correctAnswer: 2,
        explanation: 'Without constraints, you can choose 8 positions out of 64 squares, which is "64 choose 8". However, 8! (permutations) represents valid placements with one queen per row.',
      },
      {
        question: 'Which approach is most efficient for N-Queens?',
        options: ['Brute force trying all positions', 'Backtracking with constraint checking', 'Random placement', 'Genetic algorithm'],
        correctAnswer: 1,
        explanation: 'Backtracking with efficient constraint checking (tracking attacked rows, columns, and diagonals) is the most efficient approach for N-Queens.',
      },
      {
        question: 'If you place a queen at row 2, column 2, what spots are eliminated by the diagonal constraints?',
        options: [
          'Only (3,3)',
          'Only spots with identical row and column numbers',
          'Any spot where the absolute difference of row and col coordinates equals the absolute difference of the queen\'s',
          'All spots on the board'
        ],
        correctAnswer: 2,
        explanation: 'Diagonal attacks exist precisely where the vertical distance equals the horizontal distance: |r1 - r2| == |c1 - c2|.'
      },
      {
        question: 'How does N-Queens highlight the main strength of Backtracking?',
        options: [
          'It finishes instantly',
          'It saves computing power by abandoning partial boards that are already invalid',
          'It uses no memory',
          'It can parallelize natively'
        ],
        correctAnswer: 1,
        explanation: 'Backtracking\'s power lies in pruning. If you put 2 queens on the same row, backtracking stops exploring that timeline immediately, instantly avoiding millions of future invalid boards.'
      },
    ],
    importantContent: [
      {
        title: 'Backtracking Pattern',
        content:
          'N-Queens demonstrates the backtracking pattern: make a choice, explore recursively, if unsuccessful, undo the choice and try another. This pattern applies to many NP-complete problems.',
      },
      {
        title: 'Constraint Propagation',
        content:
          'Smart constraint checking (tracking attacked rows, columns, diagonals) is crucial for efficiency. Naive approaches that check all pairs of queens are much slower.',
      },
      {
        title: 'NP-Complete Complexity',
        content:
          'N-Queens is an example of an NP-complete problem with exponential time complexity. It demonstrates why heuristics and optimization techniques are essential for larger instances.',
      },
      {
        title: 'Diagonal Encoding Trick',
        content:
          'Efficient solutions often store occupied diagonals using row-col and row+col formulas. That lets the solver test safety in constant time instead of scanning the board repeatedly.',
      },
      {
        title: 'Why It Is a Great Teaching Problem',
        content:
          'N-Queens is small enough to visualize yet rich enough to demonstrate pruning, recursion, search trees, and the value of abandoning bad partial solutions early.',
      },
    ],
    pseudocode: `function solve(row):
  if row == N: return true
  for col from 0 to N-1:
    if isSafe(row, col):
      placeQueen(row, col)
      if solve(row + 1): return true
      removeQueen(row, col)
  return false`,
    realWorldApplications: [
      {
        icon: '🖥️',
        industry: 'VLSI Chip Design',
        title: 'Non-Conflicting Circuit Placement',
        description: 'Placing logic gates, memory cells, or transistors on a chip so no two components interfere electromagnetically or create short circuits mirrors the N-Queens constraint model. EDA tools use backtracking to find valid placements.',
        impact: 'Intel and TSMC use constraint-satisfaction solvers (N-Queens family) when placing billions of transistors on 3nm chips.',
      },
      {
        icon: '📅',
        industry: 'Education & Scheduling',
        title: 'University Exam Timetabling',
        description: 'Scheduling exams so no student has two exams at the same time is a graph-coloring / constraint satisfaction problem identical in structure to N-Queens. Backtracking assigns time slots while satisfying all student-conflict constraints.',
        impact: 'Universities with 50,000+ students use automated constraint-satisfaction scheduling, reducing manual effort from weeks to hours.',
      },
      {
        icon: '📡',
        industry: 'Telecommunications',
        title: 'Frequency Assignment in Cellular Networks',
        description: 'Assigning radio frequencies to cell towers so adjacent towers don\'t interfere is a graph-coloring problem solved using backtracking — structurally equivalent to placing non-attacking queens.',
        impact: 'Enables 5G networks to serve millions of simultaneous users without cross-channel interference across densely packed urban cell sites.',
      },
      {
        icon: '🧩',
        industry: 'AI & Constraint Programming',
        title: 'Sudoku and Constraint Solvers',
        description: 'Sudoku solvers, Cryptarithmetic puzzles, and general CSP (Constraint Satisfaction Problem) engines use the same backtracking framework as N-Queens. Libraries like Google OR-Tools generalise this pattern.',
        impact: 'Google OR-Tools (based on constraint propagation + backtracking) solves real logistics, scheduling, and routing problems for companies like Google and Airbus.',
      },
      {
        icon: '🏭',
        industry: 'Parallel Computing',
        title: 'Thread Conflict-Free Task Assignment',
        description: 'Assigning N independent tasks to N CPU cores such that shared memory access patterns don\'t conflict is analogous to placing N queens. Backtracking-based schedulers explore assignment spaces to find conflict-free mappings.',
        impact: 'Critical for lock-free parallel algorithm design in high-performance computing clusters with hundreds of cores.',
      },
    ],
  },
  prim: {
    name: "Prim's Algorithm",
    category: 'Minimum Spanning Tree (MST)',
    summary: {
      overview:
        "Prim's is a greedy algorithm that finds a MST for a weighted undirected graph. It builds the tree one vertex at a time, always choosing the cheapest edge connecting a vertex in the tree to one outside.",
      keyPoints: [
        'Starts from an arbitrary node and grows the tree',
        'Always picks the minimum weight edge that connects to a new vertex',
        'Uses a priority queue (Min-Heap) for efficiency',
        'Works only on connected, undirected graphs',
        'Guaranteed to find the optimal MST',
        'Better suited for dense graphs compared to Kruskal\'s',
        'Frontier nodes are tracked to discover cheap exit edges effectively',
      ],
    },
    complexity: {
      time: 'O(E log V) or O(E + V log V) with Fibonacci Heap',
      space: 'O(V)',
    },
    youtubeId: '4ZlRH0eK-qQ',
    flashcards: [
      {
        question: 'How does Prim\'s algorithm start?',
        answer: 'It starts from an arbitrary root vertex and grows the MST one edge at a time.',
      },
      {
        question: 'Which edge is selected in each step of Prim\'s?',
        answer: 'The edge with the minimum weight that connects a vertex in the MST to a vertex outside the MST.',
      },
      {
        question: 'What data structure optimizes Prim\'s algorithm?',
        answer: 'A Priority Queue (Min-Heap) is used to efficiently find the minimum weight edge connected to the current tree.',
      },
      {
        question: 'Can Prim\'s handle graphs with negative edge weights?',
        answer: 'Yes, Prim\'s handles negative weights correctly. However, if there are negative cycles, the concept of MST becomes complex.',
      },
      {
        question: 'Difference between Prim\'s and Dijkstra?',
        answer: 'Dijkstra finds shortest path from source (uses cumulative distance), while Prim\'s finds MST (uses edge weight only).',
      },
    ],
    animations: [
      {
        title: 'Frontier Expansion',
        description: 'Watch the tree grow as the cheapest edges are selected from the frontier.',
      },
      {
        title: 'Priority Queue Logic',
        description: 'See how the Min-Heap maintains the best candidate edges.',
      },
      {
        title: 'Final MST Construction',
        description: 'The complete set of edges forming the Minimum Spanning Tree is revealed.',
      },
    ],
    quiz: [
      {
        question: 'In Prim\'s algorithm, what is maintained in the priority queue?',
        options: ['All edges in the graph', 'Edges connecting MST nodes to non-MST nodes', 'Only the nodes', 'The path weights'],
        correctAnswer: 1,
        explanation: 'Prim\'s maintains the potential edges that can "join" the current tree in a priority queue.',
      },
      {
        question: 'What is the best scenario for using Prim\'s over Kruskal\'s?',
        options: ['Sparse graphs', 'Dense graphs', 'Disconnected graphs', 'Directed graphs'],
        correctAnswer: 1,
        explanation: 'Prim\'s is generally faster for dense graphs, especially when implemented with a Fibonacci Heap.',
      },
      {
        question: 'Does Prim\'s always produce the same MST for a graph?',
        options: ['Yes, it is unique', 'No, unless all edge weights are unique', 'Only for trees', 'Only for bipartite graphs'],
        correctAnswer: 1,
        explanation: 'If multiple edges have the same weight, different MSTs can exist. The algorithm is only unique if all weights are distinct.',
      },
      {
        question: 'What happens if the graph is disconnected?',
        options: ['It crashes', 'It finds a Minimum Spanning Forest', 'It stops after the first component', 'It connects the components with zero edges'],
        correctAnswer: 2,
        explanation: 'A single run of Prim\'s only finds the MST for one connected component. You must run it again for other components.',
      },
      {
        question: 'How do you check if a node has already been included in the tree?',
        options: ['Checking its distance', 'Using a "visited" or "inMST" boolean array', 'Scanning the edge list', 'Looking at the Priority Queue'],
        correctAnswer: 1,
        explanation: 'We mark nodes as they are added to the tree to ensure we only look at edges connecting to brand-new vertices.',
      },
    ],
    importantContent: [
      {
        title: 'Greedy Strategy',
        content: 'Prim\'s is a classic example of a greedy algorithm. By making locally optimal choices at each step, it achieves a globally optimal Minimum Spanning Tree.',
      },
      {
        title: 'Fibonacci Heap Optimization',
        content: 'Using a Fibonacci Heap reduces the complexity to O(E + V log V), making it exceptionally efficient for massive, dense network topologies.',
      },
    ],
    pseudocode: `Initialize priorityQueue with all nodes as infinity distance
Set distance to startNode as 0
Add startNode to priorityQueue
While priorityQueue is not empty:
  u = priorityQueue.extractMin()
  Mark u as inMST
  For each neighbor v of u:
    If v not in MST and weight(u, v) < distance[v]:
      distance[v] = weight(u, v)
      v.parent = u
      Update v in priorityQueue`,
    realWorldApplications: [
      {
        icon: '🔌',
        industry: 'Power Engineering',
        title: 'Electrical Grid Design',
        description: 'Power companies use Prim\'s to design minimum-cost electrical distribution networks connecting cities, substations, and homes — finding the cheapest set of cables that ensures every point has electricity.',
        impact: 'Saves hundreds of millions of dollars in infrastructure cost on national grid projects spanning thousands of kilometres.',
      },
      {
        icon: '📞',
        industry: 'Telecommunications',
        title: 'Fiber Optic Network Layout',
        description: 'Telecom companies (AT&T, Jio, BT) use MST algorithms to determine the minimum total cable length to connect all cities or data centres in a region with fiber optic lines.',
        impact: 'Applied during 5G rollout planning to minimise trenching and cable costs while ensuring 100% geographic coverage.',
      },
      {
        icon: '🧬',
        industry: 'Bioinformatics',
        title: 'Phylogenetic Tree Construction',
        description: 'MST algorithms reconstruct evolutionary trees (phylogenies) by connecting species based on genetic distance — the MST represents the most parsimonious evolutionary pathway.',
        impact: 'Used by the Human Genome Project and COVID-19 variant tracking (Nextstrain) to map viral evolution across thousands of samples.',
      },
      {
        icon: '🗂️',
        industry: 'Data Mining',
        title: 'Cluster Analysis in Datasets',
        description: 'Single-linkage clustering builds an MST over data points using feature-space distances, then cuts the longest edges to form clusters. Used in image segmentation and customer segmentation.',
        impact: 'Powers anomaly detection systems in fraud analytics, grouping millions of transactions and isolating outlier clusters.',
      },
      {
        icon: '🚰',
        industry: 'Civil Engineering',
        title: 'Water Pipeline Network Design',
        description: 'Municipal water authorities use MST algorithms to plan the most cost-effective pipeline networks connecting water treatment plants to residential and commercial consumers.',
        impact: 'Widely used by city planners to minimize infrastructure investment for water/gas/sewage systems in smart city projects.',
      },
    ],
  },
  kruskal: {
    name: "Kruskal's Algorithm",
    category: 'Minimum Spanning Tree (MST)',
    summary: {
      overview:
        "Kruskal's is a greedy algorithm that finds a MST by sorting all edges by weight and adding them one by one, provided they don't form a cycle. It is highly effective for sparse graphs.",
      keyPoints: [
        'Sorts all edges in non-decreasing order of weight',
        'Uses Union-Find (Disjoint Set Union) for cycle detection',
        'Adds edges to the tree as long as it doesn\'t connect two already-connected components',
        'Works on weighted undirected graphs',
        'Starts with a forest and merges components into a single tree',
        'Complexity is dominated by the sorting of edges',
        'Often preferred for sparse graphs due to simpler edge iteration',
      ],
    },
    complexity: {
      time: 'O(E log E) or O(E log V)',
      space: 'O(V)',
    },
    youtubeId: '71UQH7Pr9kU',
    flashcards: [
      {
        question: 'What is the first step in Kruskal\'s algorithm?',
        answer: 'Sort all edges in the graph in ascending order based on their weight.',
      },
      {
        question: 'How does Kruskal\'s prevent cycles?',
        answer: 'It uses the Union-Find data structure to check if two vertices belong to the same component before adding an edge.',
      },
      {
        question: 'When does the algorithm stop?',
        answer: 'When (V - 1) edges have been added to the tree, or all edges have been evaluated.',
      },
      {
        question: 'How does Kruskal\'s differ from Prim\'s?',
        answer: 'Kruskal\'s grows a forest that eventually merges, while Prim\'s grows a single tree outward from a seed node.',
      },
      {
        question: 'What is the complexity of sorting edges?',
        answer: 'O(E log E), which is often the performance bottleneck of the algorithm.',
      },
    ],
    animations: [
      {
        title: 'Edge Sorting',
        description: 'Visualize all edges being ranked by their weights before processing.',
      },
      {
        title: 'Cycle Detection (Union-Find)',
        description: 'Watch as the algorithm checks if adding an edge connects two separate trees.',
      },
      {
        title: 'MST Forest Merge',
        description: 'See smaller components merging into one final MST.',
      },
    ],
    quiz: [
      {
        question: 'Which data structure is vital for Kruskal\'s cycle detection?',
        options: ['Stack', 'Priority Queue', 'Union-Find (Disjoint Set)', 'Linked List'],
        correctAnswer: 2,
        explanation: 'Union-Find provides nearly constant-time operations to detect and merge connected components.',
      },
      {
        question: 'If a graph has V vertices and E edges, how many edges will the final MST have?',
        options: ['E - 1', 'V - 1', 'V', 'log E'],
        correctAnswer: 1,
        explanation: 'A tree with V vertices always has exactly V-1 edges.',
      },
      {
        question: 'Why sort the edges first?',
        options: ['To find the shortest path', 'To ensure we pick the cheapest available edges first', 'To detect cycles faster', 'To reduce memory usage'],
        correctAnswer: 1,
        explanation: 'Kruskal\'s greedy approach depends on evaluating edges from least to most expensive.',
      },
      {
        question: 'What happens if two edges have the same weight?',
        options: ['The algorithm fails', 'One is picked arbitrarily', 'Both must be added', 'It chooses the one with lower vertex ID'],
        correctAnswer: 1,
        explanation: 'The order doesn\'t matter for correctness; any arbitrary choice between equal-weight edges is fine.',
      },
      {
        question: 'Kruskal\'s is best suited for what type of graph?',
        options: ['Dense graphs', 'Sparse graphs', 'Graphs with many cycles', 'Directed acyclic graphs'],
        correctAnswer: 1,
        explanation: 'Kruskal\'s performs very well on sparse graphs because it iterates over the edge list, whereas Prim\'s may have higher overhead per vertex.',
      },
    ],
    importantContent: [
      {
        title: 'Global Optimization',
        content: 'Unlike Prim\'s which is local, Kruskal\'s processes the entire graph globally, picking edges from anywhere as long as they help build the MST without cycles.',
      },
      {
        title: 'Parallelism Potential',
        content: 'Sorting can be parallelized, making Kruskal\'s interesting for high-performance distributed graph processing.',
      },
    ],
    pseudocode: `Sort all edges by weight in non-decreasing order
Initialize Union-Find structure for each vertex
For each edge (u, v) in sorted edges:
  If find(u) != find(v):
    Add (u, v) to MST
    union(u, v)`,
    realWorldApplications: [
      {
        icon: '🌍',
        industry: 'Internet Infrastructure',
        title: 'Internet Backbone Design',
        description: 'ISPs and cloud providers (AWS, Azure, Google Cloud) use Kruskal\'s to plan the minimum-cost set of fiber routes connecting their global data centres — sorting thousands of potential cable segments and greedily picking cheapest non-cycle-forming links.',
        impact: 'Shapes the physical topology of the internet\'s backbone, directly impacting latency and cost for billions of users worldwide.',
      },
      {
        icon: '🛣️',
        industry: 'Civil Infrastructure',
        title: 'Road Network Planning',
        description: 'Transportation departments use Kruskal\'s to find the minimum total road length required to connect all towns in a region — applied in developing countries where road investment must be minimized.',
        impact: 'World Bank infrastructure projects use MST-based planning to connect rural communities at minimum construction cost.',
      },
      {
        icon: '🖼️',
        industry: 'Computer Vision',
        title: 'Image Segmentation (Felzenszwalb Algorithm)',
        description: 'The Felzenszwalb-Huttenlocher image segmentation algorithm builds a Kruskal-style MST over image pixels (nodes) using color/intensity differences as edge weights, then cuts long edges to form segments.',
        impact: 'Runs in near-linear time and powers background-removal tools in photo editors and medical image analysis software.',
      },
      {
        icon: '🔌',
        industry: 'Electronics',
        title: 'Printed Circuit Board (PCB) Routing',
        description: 'EDA tools use MST algorithms when routing minimum-length connections between pins on a PCB — critical for reducing signal propagation delay and manufacturing copper cost.',
        impact: 'Every PCB in smartphones, laptops, and IoT devices is partially designed using MST-based routing optimization.',
      },
      {
        icon: '👥',
        industry: 'Social Network Analysis',
        title: 'Community Detection',
        description: 'Building an MST over a social graph (with edge weights as inverse similarity) and cutting high-weight edges reveals tightly-knit communities — a fast alternative to expensive clustering algorithms.',
        impact: 'Used by LinkedIn to detect professional community clusters for targeted content delivery and skill-based recommendations.',
      },
    ],
  },

  knapsack01: {
    name: '0/1 Knapsack Problem',
    category: 'Dynamic Programming',
    summary: {
      overview:
        'The 0/1 Knapsack problem asks: given a set of items each with a weight and value, determine the combination that maximizes total value without exceeding a weight capacity W. Each item can either be taken (1) or left (0) — no fractions allowed. It is solved optimally using dynamic programming by building a 2D table.',
      keyPoints: [
        'Each item is either fully included or completely excluded',
        'DP table dp[i][w] stores max value using first i items with capacity w',
        'Recurrence: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])',
        'Time and space complexity both O(n·W)',
        'Optimal substructure and overlapping subproblems make DP applicable',
        'Backtracking the dp table reveals which items were selected',
        'Space can be optimized to O(W) by using a 1D rolling array',
      ],
    },
    complexity: {
      time: 'O(n·W)',
      space: 'O(n·W) or O(W) with optimization',
    },
    youtubeId: 'nLmhmB6NzcM',
    flashcards: [
      {
        question: 'What is the key difference between 0/1 and Fractional Knapsack?',
        answer:
          'In 0/1 Knapsack, each item must be taken whole or not at all. Fractional Knapsack allows taking a fraction of an item. 0/1 requires DP; Fractional can be solved greedily.',
      },
      {
        question: 'What does dp[i][w] represent in 0/1 Knapsack?',
        answer:
          'dp[i][w] is the maximum value achievable using the first i items with a knapsack capacity of w.',
      },
      {
        question: 'What is the recurrence relation for 0/1 Knapsack?',
        answer:
          'dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]]) if wt[i] <= w, else dp[i][w] = dp[i-1][w].',
      },
      {
        question: 'How do you reconstruct which items were selected?',
        answer:
          'Backtrack from dp[n][W]. If dp[i][w] != dp[i-1][w], item i was included; subtract its weight and move to dp[i-1][w-wt[i]].',
      },
      {
        question: 'Why is greedy not optimal for 0/1 Knapsack?',
        answer:
          'Greedy by value/weight ratio may pick items that leave capacity unused or block better combinations. DP explores all possibilities, guaranteeing the optimal solution.',
      },
    ],
    animations: [
      {
        title: 'DP Table Construction',
        description: 'Watch the 2D dp table fill row by row as each item is considered against every capacity.',
      },
      {
        title: 'Item Include vs Exclude Decision',
        description: 'See how the algorithm chooses to include or skip each item based on available capacity.',
      },
      {
        title: 'Solution Backtracking',
        description: 'Trace back through the completed table to identify exactly which items are in the optimal set.',
      },
    ],
    quiz: [
      {
        question: 'What approach is used to solve the 0/1 Knapsack problem optimally?',
        options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Branch and Bound'],
        correctAnswer: 2,
        explanation: 'Dynamic Programming is used because the problem has overlapping subproblems and optimal substructure — the hallmarks of DP applicability.',
      },
      {
        question: 'If you have n=3 items and capacity W=5, what is the size of the DP table?',
        options: ['3×5', '4×6', '3×6', '4×5'],
        correctAnswer: 1,
        explanation: 'The DP table is (n+1)×(W+1) = 4×6, indexing from 0 for both items and capacities.',
      },
      {
        question: 'What happens to dp[i][w] when item i weighs more than current capacity w?',
        options: [
          'dp[i][w] = 0',
          'dp[i][w] = dp[i-1][w] (skip item)',
          'dp[i][w] = val[i]',
          'The algorithm terminates',
        ],
        correctAnswer: 1,
        explanation: 'When the item weight exceeds current capacity, we cannot include it, so we inherit the value from the previous row: dp[i][w] = dp[i-1][w].',
      },
      {
        question: 'How can the O(n·W) space complexity be improved?',
        options: ['Use recursion instead', 'Use a 1D array updated in reverse', 'Use greedy', 'Sort items first'],
        correctAnswer: 1,
        explanation: 'Using a single 1D array and updating it right-to-left ensures each capacity is updated using previously unmodified values, reducing space to O(W).',
      },
      {
        question: 'Which property makes 0/1 Knapsack solvable by DP?',
        options: ['Greedy choice property', 'Optimal substructure and overlapping subproblems', 'Divide without overlap', 'Linear independence of items'],
        correctAnswer: 1,
        explanation: 'Both optimal substructure (optimal solution contains optimal sub-solutions) and overlapping subproblems (same sub-problems recur) justify the DP approach.',
      },
    ],
    importantContent: [
      {
        title: 'Optimal Substructure',
        content:
          'The optimal solution for a knapsack of capacity W using items 1..n includes the optimal solution for a sub-problem using items 1..n-1 with possibly reduced capacity. This recursive structure is key to DP.',
      },
      {
        title: '1D Space Optimization',
        content:
          'Traverse the weight dimension from right to left in a 1D array to avoid using values already updated in the current iteration, shrinking space from O(n·W) to O(W).',
      },
      {
        title: 'Why Greedy Fails',
        content:
          'Sorting items by value/weight and greedily picking does not work for 0/1 Knapsack. A lighter, lower-ratio item might combine with others better than a single high-ratio item.',
      },
      {
        title: 'Real-World Uses',
        content:
          'Used in resource allocation problems such as selecting investment projects under a budget, loading cargo with weight limits, or choosing features within a software sprint capacity.',
      },
      {
        title: 'Variants',
        content:
          'Extensions include the Unbounded Knapsack (items can be reused), Multiple Knapsack (multiple bags), and Bounded Knapsack (each item has a limit on how many times it can be taken).',
      },
    ],
    pseudocode: `for i from 0 to n:
  dp[i][0] = 0
for w from 0 to W:
  dp[0][w] = 0

for i from 1 to n:
  for w from 0 to W:
    if wt[i] <= w:
      dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])
    else:
      dp[i][w] = dp[i-1][w]

return dp[n][W]`,
    realWorldApplications: [
      {
        icon: '💼',
        industry: 'Finance & Investment',
        title: 'Portfolio Selection Under Budget Constraint',
        description: 'Selecting which investment projects or stocks to fund given a fixed capital budget is a 0/1 Knapsack problem — each project either gets full funding or none, and the goal is to maximize total expected return.',
        impact: 'Used by VC firms and project management offices to allocate R&D budgets across dozens of candidate initiatives.',
      },
      {
        icon: '✈️',
        industry: 'Logistics & Transport',
        title: 'Cargo Loading Optimization',
        description: 'Airlines and shipping companies determine which freight items to load onto an aircraft or container ship (given total weight/volume capacity) to maximize revenue — a classic indivisible 0/1 Knapsack.',
        impact: 'FedEx and UPS use DP-based load optimization to maximize package revenue per flight, directly impacting millions in daily profit.',
      },
      {
        icon: '🚀',
        industry: 'Software Engineering',
        title: 'Agile Sprint Feature Selection',
        description: 'Product managers allocate story points (capacity = sprint capacity W) across features (items) to maximize business value shipped per sprint — a direct application of 0/1 Knapsack where features are indivisible.',
        impact: 'Tools like Jira and Linear increasingly use automated capacity optimization to suggest optimal sprint backlog configurations.',
      },
      {
        icon: '☁️',
        industry: 'Cloud Computing',
        title: 'Virtual Machine Resource Allocation',
        description: 'Cloud providers (AWS, GCP) assign VM workloads to physical servers, each with fixed RAM/CPU capacity, to maximize server utilization — a bin-packing variant of the 0/1 Knapsack problem.',
        impact: 'Improves data-center utilization by 20–30%, directly reducing operational costs for cloud providers serving millions of customers.',
      },
      {
        icon: '🎒',
        industry: 'Humanitarian Aid',
        title: 'Emergency Supply Pack Optimization',
        description: 'Aid organizations (UNICEF, Red Cross) use 0/1 Knapsack to select which medical supplies, food, and equipment to pack in limited-capacity emergency kits for disaster relief deployments.',
        impact: 'Maximizes life-saving resources delivered per kilogram within strict weight limits for airlifted relief operations.',
      },
    ],
  },

  fractionalKnapsack: {
    name: 'Fractional Knapsack Problem',
    category: 'Greedy Algorithms',
    summary: {
      overview:
        'The Fractional Knapsack problem allows taking fractions of items, enabling a greedy approach. Sort items by value-to-weight ratio in descending order, then greedily take as much as possible of each item until the knapsack is full. Unlike 0/1 Knapsack, this produces an optimal solution with greedy.',
      keyPoints: [
        'Items can be divided — fractions are allowed',
        'Greedy strategy: sort by value/weight ratio descending',
        'Take full items when possible; take fraction of the last item to fill capacity',
        'O(n log n) due to sorting; O(1) extra space',
        'Greedy works here because of the continuous choice property',
        'Always produces an optimal solution — provable by exchange argument',
        'Much simpler than 0/1 variant; does not need DP',
      ],
    },
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)',
    },
    youtubeId: 'oTTzNMHM05I',
    flashcards: [
      {
        question: 'Why does greedy work for Fractional Knapsack but not 0/1 Knapsack?',
        answer:
          'In the fractional version, items are divisible. This enables the greedy choice property: always picking the highest value/weight item is provably optimal. 0/1 items cannot be split, so greedy can fail.',
      },
      {
        question: 'What is the greedy criterion for Fractional Knapsack?',
        answer:
          'Sort items by value-to-weight ratio (value/weight) in descending order and greedily take as much of the highest-ratio item as the remaining capacity allows.',
      },
      {
        question: 'What happens when the knapsack cannot fully hold the next item?',
        answer:
          'Take only the fraction that fills the remaining capacity. The contributed value is: (remaining_capacity / item_weight) × item_value.',
      },
      {
        question: 'What is the time complexity and why?',
        answer:
          'O(n log n) because the dominant step is sorting the items by value/weight ratio. The greedy selection itself is O(n).',
      },
      {
        question: 'Give a real-world analogy for Fractional Knapsack.',
        answer:
          'Loading a truck with bulk goods (grains, liquid) where you can pour a partial amount — you fill with the most profitable goods first, then partially fill with the next best.',
      },
    ],
    animations: [
      {
        title: 'Ratio Sorting',
        description: 'See items ranked by their value/weight ratios from highest to lowest before selection begins.',
      },
      {
        title: 'Greedy Item Selection',
        description: 'Watch the knapsack fill up item by item, taking full items first then a fraction at the end.',
      },
      {
        title: 'Value Accumulation',
        description: 'Track total value accumulating as each item is added until the knapsack reaches full capacity.',
      },
    ],
    quiz: [
      {
        question: 'Which sorting criteria is used in Fractional Knapsack?',
        options: ['Sort by value descending', 'Sort by weight ascending', 'Sort by value/weight ratio descending', 'Sort by weight descending'],
        correctAnswer: 2,
        explanation: 'Sorting by value/weight (profit density) descending ensures we greedily pick the most rewarding items per unit weight first.',
      },
      {
        question: 'If an item weighs 10kg, has value 60, and 6kg of capacity remains, how much value is gained?',
        options: ['60', '36', '10', '6'],
        correctAnswer: 1,
        explanation: 'Take 6/10 of the item: (6/10) × 60 = 36 units of value.',
      },
      {
        question: 'What is the time complexity of the Fractional Knapsack algorithm?',
        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'The bottleneck is sorting the items by ratio, which costs O(n log n). The greedy pass itself is linear O(n).',
      },
      {
        question: 'Is the greedy solution to Fractional Knapsack always optimal?',
        options: ['Yes, always', 'No, never', 'Only for integer weights', 'Only if items have equal weights'],
        correctAnswer: 0,
        explanation: 'Yes. This is provable via exchange argument: swapping any chosen fraction with another of lower ratio can only decrease the total value.',
      },
      {
        question: 'What property differentiates Fractional Knapsack from 0/1 Knapsack algorithmically?',
        options: [
          'Fractional uses DP, 0/1 uses greedy',
          'Fractional has greedy choice property, 0/1 does not',
          'Both use the same algorithm',
          'Fractional is NP-hard, 0/1 is not',
        ],
        correctAnswer: 1,
        explanation: 'The greedy choice property holds for Fractional Knapsack (divisible items) but fails for 0/1 Knapsack (indivisible items), which mandates DP.',
      },
    ],
    importantContent: [
      {
        title: 'Greedy Choice Property',
        content:
          'The key property that makes greedy optimal here: at any point, the best local decision (highest ratio item) always contributes to the globally optimal solution. This can be proven by exchange argument.',
      },
      {
        title: 'Comparison with 0/1 Knapsack',
        content:
          'Fractional Knapsack is always solvable in O(n log n) and achieves a value ≥ the 0/1 Knapsack solution, since it has more freedom (can take fractions). 0/1 Knapsack requires O(n·W) DP.',
      },
      {
        title: 'Real-World Applications',
        content:
          'Used in scheduling (allocating CPU time as fractional units), investment portfolios (taking fractional shares), and logistics (bulk loading of divisible cargo).',
      },
      {
        title: 'Profit Density Concept',
        content:
          'Value/weight ratio is also called profit density. Maximizing profit density greedily is the natural extension of a per-unit profit maximization strategy used in economics.',
      },
      {
        title: 'Exchange Argument Proof',
        content:
          'If the optimal solution deviates from our greedy choice, swapping a lower-density fraction for a higher-density one improves or maintains total value — proving greedy is optimal.',
      },
    ],
    pseudocode: `Sort items by (value/weight) ratio in descending order
Initialize totalValue = 0, remainingCapacity = W

For each item i in sorted order:
  If remainingCapacity == 0: break
  If wt[i] <= remainingCapacity:
    totalValue += val[i]
    remainingCapacity -= wt[i]
  Else:
    fraction = remainingCapacity / wt[i]
    totalValue += fraction * val[i]
    remainingCapacity = 0

Return totalValue`,
    realWorldApplications: [
      {
        icon: '📈',
        industry: 'Finance & Trading',
        title: 'Fractional Share & Commodity Trading',
        description: 'Brokerages like Robinhood and Fidelity allow fractional share purchases. Portfolio optimization algorithms use fractional knapsack to allocate a fixed budget across stocks with the highest return/risk ratios.',
        impact: 'Democratizes investment for small investors — 60%+ of new Robinhood accounts use fractional shares for diversification.',
      },
      {
        icon: '⚙️',
        industry: 'Operating Systems',
        title: 'CPU Time-Slice Scheduling',
        description: 'The Completely Fair Scheduler (CFS) in Linux allocates CPU time proportionally to process priority weights — a fractional allocation problem where the "capacity" is total available CPU cycles per time quantum.',
        impact: 'Powers scheduling on every Android device, Linux server, and most cloud virtual machines worldwide.',
      },
      {
        icon: '📶',
        industry: 'Telecommunications',
        title: 'Network Bandwidth Allocation',
        description: 'ISPs use weighted fair queuing to allocate available bandwidth among competing data flows. High-priority traffic (VoIP, video) gets proportionally more bandwidth — a continuous fractional allocation.',
        impact: 'Ensures stable video quality on streaming platforms (Netflix, YouTube) even during network congestion events.',
      },
      {
        icon: '🛢️',
        industry: 'Energy & Resources',
        title: 'Oil & Fuel Loading (Tanker Optimization)',
        description: 'Fuel tankers and oil pipelines use fractional knapsack to determine optimal cargo mix — loading the highest-value-per-tonne fuel grades first until ship or pipeline capacity is reached.',
        impact: 'Maximizes revenue per voyage for LNG tankers worth $200M+ by optimally blending cargo grades.',
      },
      {
        icon: '🌱',
        industry: 'Agriculture',
        title: 'Precision Irrigation Scheduling',
        description: 'Given a limited daily water budget, precision agriculture systems allocate water fractionally across crop fields ordered by crop value-per-litre, ensuring highest-value crops receive full irrigation first.',
        impact: 'Reduces water usage by 30–50% in smart farms while maintaining or increasing total crop yield value.',
      },
    ],
  },

  lcs: {
    name: 'Longest Common Subsequence (LCS)',
    category: 'Dynamic Programming',
    summary: {
      overview:
        'LCS finds the longest sequence of characters that appear in the same relative order in two strings, but not necessarily contiguously. It is a classic DP problem with applications in bioinformatics and diff utilities. A 2D DP table stores the LCS length for every pair of prefixes.',
      keyPoints: [
        'Subsequence need not be contiguous, only order must be preserved',
        'DP table dp[i][j] = LCS length of X[1..i] and Y[1..j]',
        'If X[i]==Y[j]: dp[i][j] = dp[i-1][j-1] + 1',
        'Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
        'Time and space both O(m·n) where m, n are string lengths',
        'Backtracking the table reconstructs the actual LCS string',
        'Foundation for diff algorithms used in version control (git diff)',
      ],
    },
    complexity: {
      time: 'O(m·n)',
      space: 'O(m·n) or O(min(m,n)) with optimization',
    },
    youtubeId: 'sSno9rV8Rhg',
    flashcards: [
      {
        question: 'What is a subsequence vs a substring?',
        answer:
          'A subsequence maintains original order but characters need not be adjacent. A substring must be a contiguous block of characters.',
      },
      {
        question: 'What is the recurrence for LCS?',
        answer:
          'If X[i] == Y[j]: dp[i][j] = dp[i-1][j-1] + 1. Otherwise: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
      },
      {
        question: 'How do you reconstruct the actual LCS string from the DP table?',
        answer:
          'Start from dp[m][n]. If X[i]==Y[j], include that character and move diagonally. Otherwise, move in the direction of the larger value (up or left).',
      },
      {
        question: 'What is the LCS length of "ABCBDAB" and "BDCAB"?',
        answer: '4. The LCS is "BCAB" or "BDAB".',
      },
      {
        question: 'Name two real-world applications of LCS.',
        answer:
          'Git diff (showing differences between file versions) and DNA sequence alignment in bioinformatics.',
      },
    ],
    animations: [
      {
        title: 'DP Table Fill',
        description: 'Watch the LCS table being built cell by cell comparing each character pair.',
      },
      {
        title: 'Character Match Highlight',
        description: 'See how matching characters trigger a diagonal increment in the DP table.',
      },
      {
        title: 'Backtracking Path',
        description: 'Trace the path from dp[m][n] back to dp[0][0] to reconstruct the LCS string.',
      },
    ],
    quiz: [
      {
        question: 'What does dp[i][j] store in the LCS algorithm?',
        options: [
          'Length of longest common substring ending at i,j',
          'Length of LCS of first i characters of X and first j characters of Y',
          'Number of matching characters',
          'Position of last match',
        ],
        correctAnswer: 1,
        explanation: 'dp[i][j] represents the length of the Longest Common Subsequence of the prefixes X[1..i] and Y[1..j].',
      },
      {
        question: 'What is done when X[i] != Y[j] in LCS?',
        options: [
          'dp[i][j] = 0',
          'dp[i][j] = dp[i-1][j-1]',
          'dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
          'dp[i][j] = dp[i][j-1] + 1',
        ],
        correctAnswer: 2,
        explanation: 'When characters do not match, we inherit the best result from either ignoring the current character of X or Y: max(dp[i-1][j], dp[i][j-1]).',
      },
      {
        question: 'LCS of "AGGTAB" and "GXTXAYB" is?',
        options: ['"GTAB" (length 4)', '"GXAB" (length 4)', '"AGTB" (length 4)', '"GTXB" (length 4)'],
        correctAnswer: 0,
        explanation: 'The LCS is "GTAB" with length 4.',
      },
      {
        question: 'How is LCS related to Edit Distance?',
        options: [
          'Edit Distance = m + n - 2 * LCS(m,n)',
          'They are unrelated',
          'LCS = Edit Distance / 2',
          'Edit Distance = LCS * 2',
        ],
        correctAnswer: 0,
        explanation: 'The minimum edit distance (using only insertions and deletions) between two strings equals m + n - 2 * LCS length.',
      },
      {
        question: 'Which traversal direction during LCS backtracking means a matched character?',
        options: ['Left', 'Up', 'Diagonal (up-left)', 'Down'],
        correctAnswer: 2,
        explanation: 'A diagonal move in the backtracking phase indicates X[i] == Y[j], meaning that character is part of the LCS.',
      },
    ],
    importantContent: [
      {
        title: 'Subsequence vs Substring',
        content:
          'LCS tracks subsequences (order-preserving but non-contiguous). The related problem Longest Common Substring requires contiguous characters and uses a slightly different DP formulation.',
      },
      {
        title: 'Git Diff Connection',
        content:
          'The diff algorithm used in git, editors, and code review tools is based on LCS. Lines that are common stay; lines unique to either file become additions or deletions.',
      },
      {
        title: 'DNA Sequence Alignment',
        content:
          'In bioinformatics, LCS (and its variant edit distance) is used to compare DNA/protein sequences to find evolutionary similarity or functional equivalence.',
      },
      {
        title: 'Space Optimization',
        content:
          'Since dp[i][j] only depends on the previous row, we can reduce space from O(m·n) to O(min(m,n)) using two rolling arrays. Note: reconstruction becomes harder with this approach.',
      },
      {
        title: 'Printing All LCS',
        content:
          'Multiple LCS strings can exist (equal-length solutions). Printing all requires DFS/backtracking through the DP table, which can be exponential in the worst case.',
      },
    ],
    pseudocode: `Initialize dp[0..m][0..n] = 0

For i from 1 to m:
  For j from 1 to n:
    If X[i] == Y[j]:
      dp[i][j] = dp[i-1][j-1] + 1
    Else:
      dp[i][j] = max(dp[i-1][j], dp[i][j-1])

// Backtrack to find actual LCS
i = m, j = n
While i > 0 and j > 0:
  If X[i] == Y[j]:
    lcs = X[i] + lcs
    i--; j--
  Else if dp[i-1][j] > dp[i][j-1]:
    i--
  Else:
    j--`,
    realWorldApplications: [
      {
        icon: '🔀',
        industry: 'Version Control Systems',
        title: 'Git Diff & Code Review (GitHub / GitLab)',
        description: 'Git\'s diff command uses LCS to show which lines were added, removed, or unchanged between two file versions. The longest common lines stay; surrounding divergences become +/- hunks.',
        impact: 'Powers code review for 100M+ GitHub repositories — every pull request diff you\'ve ever read was produced by an LCS algorithm.',
      },
      {
        icon: '🧬',
        industry: 'Bioinformatics',
        title: 'DNA & Protein Sequence Alignment',
        description: 'Tools like BLAST and Clustal Omega use LCS-based dynamic programming to align DNA, RNA, and protein sequences — finding conserved regions that indicate evolutionary relationships or functional similarity.',
        impact: 'Essential to COVID-19 variant tracking, cancer genomics, and every drug discovery pipeline that relies on sequence homology.',
      },
      {
        icon: '📄',
        industry: 'Academic Integrity',
        title: 'Plagiarism Detection (Turnitin)',
        description: 'Turnitin and Copyscape compare submitted documents to billions of sources using LCS-based similarity scoring — finding the longest matching sequences of sentences across texts.',
        impact: 'Turnitin processes 2M+ student papers daily, using LCS to detect textual similarity and protect academic integrity globally.',
      },
      {
        icon: '🔄',
        industry: 'File Systems & Sync',
        title: 'File Synchronization (rsync)',
        description: 'rsync uses LCS to identify unchanged file chunks between source and destination, transmitting only the differences. This delta-encoding minimizes data transfer over networks.',
        impact: 'Saves petabytes of bandwidth daily in backup systems, cloud sync tools, and CI/CD pipelines that only transfer changed data.',
      },
      {
        icon: '🗣️',
        industry: 'Natural Language Processing',
        title: 'Sentence Similarity & Machine Translation',
        description: 'NLP models use LCS-based ROUGE scores to evaluate machine translation quality and summarization accuracy by measuring the longest common sub-sequences between generated and reference sentences.',
        impact: 'ROUGE (LCS-based) is the primary evaluation metric for summarization in Google, OpenAI, and Meta NLP research papers.',
      },
    ],
  },

  obst: {
    name: 'Optimal Binary Search Tree (OBST)',
    category: 'Dynamic Programming',
    summary: {
      overview:
        'An Optimal Binary Search Tree minimizes the total expected search cost given a set of keys with known search probabilities. Using dynamic programming, OBST finds the root of each subtree that minimizes the weighted path lengths. It accounts for both successful searches (keys) and unsuccessful searches (dummy keys).',
      keyPoints: [
        'BST property must be maintained while minimizing expected search cost',
        'Search cost = sum of (depth+1) * probability for each key',
        'DP table e[i][j] stores minimum expected cost for keys i to j',
        'Root table root[i][j] stores the optimal root for subproblem i..j',
        'Knuth\'s optimization reduces complexity from O(n³) to O(n²)',
        'Probabilities of dummy keys (failed searches) are also considered',
        'Used in compiler symbol tables and dictionary lookups for frequent queries',
      ],
    },
    complexity: {
      time: 'O(n³) standard, O(n²) with Knuth optimization',
      space: 'O(n²)',
    },
    youtubeId: 'vLS-zRCHo-Y',
    flashcards: [
      {
        question: 'What does OBST optimize?',
        answer:
          'OBST minimizes the total expected search cost, which accounts for both the probability of searching for each key and how deep it sits in the tree.',
      },
      {
        question: 'What is the role of dummy keys in OBST?',
        answer:
          'Dummy keys represent unsuccessful searches (searching for a key that is not in the tree). Their probabilities (q[i]) model failed lookups between actual keys.',
      },
      {
        question: 'What does the DP table e[i][j] represent?',
        answer:
          'e[i][j] is the minimum expected cost of a binary search tree containing keys k_i through k_j.',
      },
      {
        question: 'How is the OBST constructed from the DP tables?',
        answer:
          'Use the root table: root[1][n] is the overall root. Recursively, root[1][r-1] is the root of the left subtree and root[r+1][n] for the right subtree.',
      },
      {
        question: 'What is Knuth\'s optimization for OBST?',
        answer:
          'Knuth showed that if root[i][j-1] ≤ root[i][j] ≤ root[i+1][j], we can limit the search for optimal root to this range, reducing complexity from O(n³) to O(n²).',
      },
    ],
    animations: [
      {
        title: 'DP Table Construction',
        description: 'See e[i][j] computed bottom-up, considering all possible roots for each subproblem.',
      },
      {
        title: 'Root Selection',
        description: 'Watch how each subproblem chooses its optimal root to minimize expected search cost.',
      },
      {
        title: 'Tree Assembly',
        description: 'See the final optimal BST assembled recursively from the root table.',
      },
    ],
    quiz: [
      {
        question: 'What does OBST minimize?',
        options: ['Tree height', 'Total number of keys', 'Expected search cost', 'Number of comparisons for worst case'],
        correctAnswer: 2,
        explanation: 'OBST minimizes the weighted expected search cost, balancing between key depth and their access frequency (probability).',
      },
      {
        question: 'Why can\'t we just use a balanced BST for optimal search?',
        options: [
          'Balanced BSTs are slower',
          'Balanced BSTs ignore key access probabilities — some keys are searched far more than others',
          'Balanced BSTs don\'t support all key types',
          'Balanced BSTs are not always binary',
        ],
        correctAnswer: 1,
        explanation: 'A balanced BST minimizes max depth, but OBST minimizes expected cost by placing frequently-accessed keys closer to the root, even if the tree becomes somewhat unbalanced.',
      },
      {
        question: 'What is the time complexity of the standard OBST algorithm?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
        correctAnswer: 3,
        explanation: 'The naive DP recurrence has three nested loops: subproblem size, subproblem starting index, and root selection — yielding O(n³).',
      },
      {
        question: 'What does p[i] represent in OBST?',
        options: ['Depth of key i', 'Probability of unsuccessful search between key i-1 and i', 'Probability of searching for key i', 'Parent pointer of key i'],
        correctAnswer: 2,
        explanation: 'p[i] is the probability that a search is for key k_i (successful search). q[i] represents probability of unsuccessful searches between keys.',
      },
      {
        question: 'What is the base case in the OBST DP recurrence?',
        options: [
          'e[i][i] = p[i]',
          'e[i][i-1] = q[i-1] (empty trees with only dummy key costs)',
          'e[1][n] = 0',
          'e[i][j] = 0 for all i,j',
        ],
        correctAnswer: 1,
        explanation: 'e[i][i-1] = q[i-1] represents the cost of an empty subtree containing only the dummy key d_{i-1}, which models a failed lookup.',
      },
    ],
    importantContent: [
      {
        title: 'Expected Cost Formula',
        content:
          'The expected search cost for a subtree with keys k_i..k_j rooted at k_r is: e[i][j] = e[i][r-1] + e[r+1][j] + w(i,j), where w(i,j) = sum of all probabilities p[i..j] and q[i-1..j].',
      },
      {
        title: 'Knuth\'s O(n²) Optimization',
        content:
          'Knuth proved the monotone root property: root[i][j-1] ≤ root[i][j] ≤ root[i+1][j]. This restricts root search range and reduces total complexity from O(n³) to O(n²).',
      },
      {
        title: 'Dummy Keys Matter',
        content:
          'Ignoring dummy keys (unsuccessful search probabilities, q[i]) would give incorrect results. In practice, failed lookups are common, and their probabilities meaningfully impact the optimal structure.',
      },
      {
        title: 'Compiler Applications',
        content:
          'OBST is used in compilers to build identifier lookup tables (symbol tables). Keywords accessed frequently are placed near the root to minimize average lookup time.',
      },
      {
        title: 'Reconstruction',
        content:
          'The root table allows full tree reconstruction. Start with root[1][n], then recursively build left (root[1][r-1]) and right (root[r+1][n]) subtrees.',
      },
    ],
    pseudocode: `// p[1..n]: search probabilities, q[0..n]: failure probabilities
Initialize e[i][i-1] = q[i-1] for all i
Initialize w[i][i-1] = q[i-1] for all i

For length l from 1 to n:
  For i from 1 to n-l+1:
    j = i + l - 1
    e[i][j] = infinity
    w[i][j] = w[i][j-1] + p[j] + q[j]
    For r from i to j:
      t = e[i][r-1] + e[r+1][j] + w[i][j]
      If t < e[i][j]:
        e[i][j] = t
        root[i][j] = r

Return e[1][n], root`,
    realWorldApplications: [
      {
        icon: '🗄️',
        industry: 'Database Systems',
        title: 'Query Optimizer Index Selection',
        description: 'Database query optimizers (PostgreSQL, MySQL) use frequency-weighted BST analysis to decide column index structures. Frequently queried values are structured closer to the root of B-tree indexes, minimizing average lookup cost.',
        impact: 'Improves query throughput by 2–5× in read-heavy OLAP workloads where certain key distributions are heavily skewed.',
      },
      {
        icon: '⌨️',
        industry: 'Programming Language Tools',
        title: 'Compiler Symbol Table Lookup',
        description: 'Compilers (GCC, LLVM) build symbol tables for variable names, keywords, and function identifiers. OBST-inspired structures place frequently used keywords (like "if", "for", "int") near the root for O(1)-like access.',
        impact: 'Reduces compilation time for large codebases by minimizing the average cost of each identifier lookup in the symbol table.',
      },
      {
        icon: '🔡',
        industry: 'Search & Autocomplete',
        title: 'Weighted Autocomplete Trees',
        description: 'Search engines and IDEs weight autocomplete suggestions by access frequency. OBST-style trie structures position the most commonly typed completions at shallow depths for faster suggestion retrieval.',
        impact: 'Google Search autocomplete reduces keystrokes by an average of 40% per query by surfacing statistically likely completions at minimum tree depth.',
      },
      {
        icon: '🌐',
        industry: 'Networking',
        title: 'IP Prefix Routing Table Optimization',
        description: 'Internet routers store IP prefix trees where lookup frequency heavily skews toward certain popular destinations. OBST principles guide optimization of these Patricia tries to reduce average packet-routing decisions.',
        impact: 'Reduces average routing lookup time in backbone routers handling 100Gbps+ traffic, where microseconds of latency translate to significant throughput improvements.',
      },
      {
        icon: '📚',
        industry: 'Information Retrieval',
        title: 'Frequency-Weighted Dictionary Structures',
        description: 'Spell-checkers and dictionary data structures in word processors (MS Word, Google Docs) use OBST-inspired layouts, placing most-commonly-looked-up words at shallower depths for faster correction suggestions.',
        impact: 'Processes keystroke-level spell checking across billions of documents in real time without perceptible latency.',
      },
    ],
  },

  hamiltonianCycle: {
    name: 'Hamiltonian Cycle',
    category: 'Backtracking',
    summary: {
      overview:
        'A Hamiltonian Cycle is a closed path in a graph that visits every vertex exactly once and returns to the starting vertex. Finding whether such a cycle exists is NP-complete and is solved using backtracking. The algorithm builds the path vertex by vertex and backtracks when it reaches a dead end.',
      keyPoints: [
        'Visits every vertex exactly once and returns to the start',
        'NP-complete — no known polynomial-time algorithm',
        'Solved via backtracking: try vertex, recurse, backtrack on failure',
        'Related to the Travelling Salesman Problem (TSP)',
        'Path constraint: next vertex must be adjacent to current and unvisited',
        'After placing n vertices, check if last connects back to first',
        'Pruning: skip vertices already visited or not adjacent to current',
      ],
    },
    complexity: {
      time: 'O(n!) in the worst case',
      space: 'O(n) for recursion stack and path array',
    },
    youtubeId: 'dQr4wZCiJJ4',
    flashcards: [
      {
        question: 'What is a Hamiltonian Cycle?',
        answer:
          'A cycle in a graph that visits every vertex exactly once and returns to the starting vertex.',
      },
      {
        question: 'How does the backtracking approach solve the Hamiltonian Cycle problem?',
        answer:
          'Build a path vertex by vertex. At each step, try adding unvisited adjacent vertices. If a dead end is reached, backtrack and try the next candidate.',
      },
      {
        question: 'What is the final check in the Hamiltonian Cycle algorithm?',
        answer:
          'After all n vertices are placed in the path, verify that there is an edge from the last vertex back to the first vertex to complete the cycle.',
      },
      {
        question: 'What is the difference between a Hamiltonian Path and a Hamiltonian Cycle?',
        answer:
          'A Hamiltonian Path visits every vertex once but does not need to return to the start. A Hamiltonian Cycle does return, forming a closed loop.',
      },
      {
        question: 'How is Hamiltonian Cycle related to TSP?',
        answer:
          'TSP finds the shortest Hamiltonian Cycle in a weighted graph. Hamiltonian Cycle asks if any such cycle exists, making TSP an optimization extension of it.',
      },
    ],
    animations: [
      {
        title: 'Path Building',
        description: 'Watch vertices being added one by one to the Hamiltonian path, checking adjacency and visited status.',
      },
      {
        title: 'Backtracking Steps',
        description: 'See the algorithm retreat when it reaches a dead end, trying the next unvisited neighbor.',
      },
      {
        title: 'Cycle Completion',
        description: 'Observe the final check connecting the last vertex back to the starting vertex to form the cycle.',
      },
    ],
    quiz: [
      {
        question: 'What complexity class does the Hamiltonian Cycle problem belong to?',
        options: ['P', 'NP-complete', 'NP-hard but not NP-complete', 'PSPACE'],
        correctAnswer: 1,
        explanation: 'Hamiltonian Cycle is a classic NP-complete problem. Verifying a solution is in polynomial time, but no polynomial algorithm for finding one is known.',
      },
      {
        question: 'At what point is the Hamiltonian Cycle algorithm complete?',
        options: [
          'When all vertices are visited',
          'When all vertices are visited AND there is an edge from last to first vertex',
          'When the graph has no unvisited neighbors',
          'When the path has n-1 edges',
        ],
        correctAnswer: 1,
        explanation: 'A Hamiltonian Cycle requires all n vertices visited exactly once AND an edge connecting the last vertex back to vertex 0 to close the cycle.',
      },
      {
        question: 'Which technique is used to solve Hamiltonian Cycle?',
        options: ['Greedy', 'Dynamic Programming', 'Backtracking', 'Divide and Conquer'],
        correctAnswer: 2,
        explanation: 'Backtracking systematically tries all vertex orderings, pruning branches where adjacency or visited constraints are violated.',
      },
      {
        question: 'What is a necessary (but not sufficient) condition for a Hamiltonian Cycle to exist?',
        options: [
          'Graph must be complete',
          'Every vertex must have degree ≥ 2',
          'Graph must be bipartite',
          'Graph must be a tree',
        ],
        correctAnswer: 1,
        explanation: 'Since the Hamiltonian Cycle enters and exits each vertex, every vertex needs at least degree 2. However, this is necessary but not sufficient — a Hamiltonian Cycle may still not exist.',
      },
      {
        question: 'What is Ore\'s Theorem related to Hamiltonian Cycles?',
        options: [
          'A graph with n≥3 has a Hamiltonian Cycle if for every non-adjacent pair, deg(u)+deg(v)≥n',
          'Every complete graph has a Hamiltonian Cycle',
          'Hamiltonian Cycle is solvable in O(n²)',
          'Graphs with all odd-degree vertices have no Hamiltonian Cycle',
        ],
        correctAnswer: 0,
        explanation: 'Ore\'s Theorem gives a sufficient condition: if deg(u) + deg(v) ≥ n for every pair of non-adjacent vertices, the graph has a Hamiltonian Cycle.',
      },
    ],
    importantContent: [
      {
        title: 'NP-Completeness',
        content:
          'Hamiltonian Cycle is one of Karp\'s original 21 NP-complete problems. There is no known polynomial algorithm. For practical use, heuristics or approximation algorithms are used.',
      },
      {
        title: 'Connection to TSP',
        content:
          'The Travelling Salesman Problem (TSP) is a weighted optimization of the Hamiltonian Cycle problem. Solving TSP optimally is also NP-hard, making both problems of deep computational interest.',
      },
      {
        title: 'Pruning Effectiveness',
        content:
          'Good pruning is critical. Check at each step: Is the vertex unvisited? Is it adjacent to the current path endpoint? Without pruning, the algorithm degenerates to O(n!).',
      },
      {
        title: 'Sufficient Conditions',
        content:
          'Dirac\'s Theorem: If every vertex has degree ≥ n/2, a Hamiltonian Cycle exists. Ore\'s Theorem gives a generalization. These theorems guarantee existence without explicit search.',
      },
      {
        title: 'Euler vs Hamiltonian',
        content:
          'An Euler Circuit visits every edge exactly once; a Hamiltonian Cycle visits every vertex exactly once. Euler circuits can be found in polynomial time (Hierholzer), but Hamiltonian is NP-complete.',
      },
    ],
    pseudocode: `function hamiltonianCycle(path, pos):
  If pos == n:
    If graph[path[pos-1]][path[0]] == 1:
      return true  // cycle found
    Else:
      return false

  For vertex v from 1 to n-1:
    If isSafe(v, path, pos):
      path[pos] = v
      If hamiltonianCycle(path, pos+1):
        return true
      path[pos] = -1  // backtrack

  return false

function isSafe(v, path, pos):
  If graph[path[pos-1]][v] == 0: return false  // no edge
  If v in path[0..pos-1]: return false          // already visited
  return true`,
    realWorldApplications: [
      {
        icon: '🚚',
        industry: 'Logistics & Delivery',
        title: 'Travelling Salesman Problem (UPS / FedEx Routes)',
        description: 'Delivery companies solve TSP (a weighted Hamiltonian Cycle) to find the shortest route that visits every stop exactly once and returns to depot. UPS\'s ORION system applies this to 55,000 drivers daily.',
        impact: 'ORION saves UPS 100M+ miles and $300M+ annually by finding near-optimal Hamiltonian delivery routes.',
      },
      {
        icon: '🧬',
        industry: 'Bioinformatics',
        title: 'DNA Fragment Assembly',
        description: 'Genome sequencing assembles thousands of short DNA "reads" into a full genome. The overlap graph of fragments is traversed as a Hamiltonian path problem — visit each fragment exactly once in correct order.',
        impact: 'Enables assembly of multi-billion base-pair human genomes, powering cancer research and personalised medicine advances.',
      },
      {
        icon: '🔬',
        industry: 'Electronics Manufacturing',
        title: 'PCB Drill Path Optimization',
        description: 'CNC drilling machines must drill thousands of holes in a PCB, visiting each hole exactly once to minimize total drill travel distance — a Hamiltonian path problem on the hole-coordinate graph.',
        impact: 'Reduces manufacturing time per PCB by 20–40%, critical for high-volume electronics production (iPhone PCBs, GPU boards).',
      },
      {
        icon: '🌍',
        industry: 'Tourism & Travel',
        title: 'Tourist Itinerary Optimization',
        description: 'Travel planning apps (Google Trips, TripAdvisor) suggest routes visiting all chosen landmarks exactly once with minimum total travel time — a Hamiltonian path through attraction nodes.',
        impact: 'Reduces sightseeing travel time by 30%+ for multi-destination city tours, improving tourist experience at scale.',
      },
      {
        icon: '🔌',
        industry: 'Network Testing',
        title: 'Network Link Coverage Testing',
        description: 'Network engineers use Hamiltonian Cycle concepts to design test sequences that traverse every network link exactly once — ensuring all connections are tested without redundant traversal.',
        impact: 'Applied in automated telecom network validation, ensuring 100% link coverage in minimum test time for 5G infrastructure rollouts.',
      },
    ],
  },

  huffman: {
    name: 'Huffman Coding',
    category: 'Greedy Algorithms',
    summary: {
      overview:
        'Huffman Coding is a lossless data compression algorithm that assigns variable-length binary codes to characters based on their frequencies. Frequent characters get shorter codes; rare ones get longer codes. A greedy approach using a min-heap builds the optimal prefix-free code tree from the bottom up.',
      keyPoints: [
        'Assigns shorter codes to more frequent characters',
        'Produces prefix-free codes — no code is a prefix of another',
        'Uses a min-heap priority queue to build the Huffman tree',
        'Algorithm: repeatedly merge two lowest-frequency nodes',
        'O(n log n) time complexity due to heap operations',
        'Optimal for symbol-by-symbol encoding given character frequencies',
        'Used in ZIP, GZIP, JPEG, and MP3 compression formats',
      ],
    },
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)',
    },
    youtubeId: 'co4_ahEDCho',
    flashcards: [
      {
        question: 'What is the key idea behind Huffman Coding?',
        answer:
          'Assign shorter binary codes to more frequent characters and longer codes to rarer ones, minimizing the total number of bits needed to represent the data.',
      },
      {
        question: 'What property do Huffman codes have?',
        answer:
          'They are prefix-free (also called prefix codes): no codeword is a prefix of another, allowing unambiguous decoding without separators.',
      },
      {
        question: 'How is the Huffman tree built?',
        answer:
          'Start with a leaf node per character. Repeatedly extract two nodes with the lowest frequencies from a min-heap and merge them into a parent node with their combined frequency.',
      },
      {
        question: 'How are codes assigned from the Huffman tree?',
        answer:
          'Traverse the tree from root to each leaf. A left branch adds "0" and a right branch adds "1" to the current code. The code at each leaf is that character\'s encoding.',
      },
      {
        question: 'Why is Huffman Coding lossless?',
        answer:
          'Because the entire original data can be perfectly reconstructed from the encoded bit stream using the Huffman tree — no information is discarded during compression.',
      },
    ],
    animations: [
      {
        title: 'Min-Heap Construction',
        description: 'Watch character frequency nodes inserted into the min-heap priority queue.',
      },
      {
        title: 'Tree Building (Merging)',
        description: 'See the two lowest-frequency nodes repeatedly merged into parent nodes until one root remains.',
      },
      {
        title: 'Code Assignment',
        description: 'Trace the tree from root to leaves, assigning 0/1 for left/right branches to generate each character\'s code.',
      },
    ],
    quiz: [
      {
        question: 'What data structure is central to building the Huffman tree?',
        options: ['Stack', 'Queue', 'Min-Heap (Priority Queue)', 'Hash Table'],
        correctAnswer: 2,
        explanation: 'A Min-Heap allows efficient extraction of the two lowest-frequency nodes at each step, making the greedy merge process O(log n) per operation.',
      },
      {
        question: 'What does "prefix-free" mean in the context of Huffman codes?',
        options: [
          'All codes have the same length',
          'No codeword is a prefix of another codeword',
          'The code always starts with 0',
          'Codes are sorted alphabetically',
        ],
        correctAnswer: 1,
        explanation: 'Prefix-free means no full codeword is the beginning of another codeword. This enables unambiguous decoding of the bit stream.',
      },
      {
        question: 'If character A has frequency 45, what kind of code length will it get?',
        options: ['Longest code', 'Shortest code', 'Same as all others', 'Always 8 bits'],
        correctAnswer: 1,
        explanation: 'High-frequency characters like A get the shortest codes in Huffman coding, since they are merged last and sit closest to the root.',
      },
      {
        question: 'What is the time complexity of Huffman Coding?',
        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'Building the Huffman tree requires n-1 merge operations, each costing O(log n) for heap operations, giving O(n log n) total.',
      },
      {
        question: 'Huffman coding is optimal for which type of encoding?',
        options: [
          'Encoding pairs of symbols',
          'Symbol-by-symbol encoding given character frequencies',
          'Encoding with a fixed code length',
          'Encoding with a lookup table',
        ],
        correctAnswer: 1,
        explanation: 'Huffman coding produces provably optimal prefix-free codes for symbol-by-symbol encoding when character frequencies are known. It minimizes the expected bits per character.',
      },
    ],
    importantContent: [
      {
        title: 'Greedy Optimality Proof',
        content:
          'Huffman\'s greedy merge is provably optimal. The two least-frequent characters should be deepest in the tree, and their order relative to each other doesn\'t matter. Swapping any merge order would only increase total bits used.',
      },
      {
        title: 'Prefix-Free Code Property',
        content:
          'Because no code is a prefix of another, sequences of Huffman-encoded characters can be decoded uniquely bit by bit, without needing delimiters between codes.',
      },
      {
        title: 'Huffman vs Arithmetic Coding',
        content:
          'Huffman assigns integer-bit codes per symbol, so it is suboptimal for symbols with probabilities not close to negative powers of 2. Arithmetic coding is superior in those cases but more complex.',
      },
      {
        title: 'Real-World Usage',
        content:
          'Huffman Coding is a component in DEFLATE (used by ZIP and GZIP), JPEG (for DC coefficient encoding), and MP3. It is often combined with other techniques like LZ77 for maximum compression.',
      },
      {
        title: 'Adaptive Huffman',
        content:
          'Standard Huffman requires knowing frequencies upfront (two-pass). Adaptive Huffman Coding builds the tree on-the-fly as data is read, enabling single-pass streaming compression.',
      },
    ],
    pseudocode: `Build a leaf node for each character with its frequency
Insert all leaf nodes into a Min-Heap

While heap has more than 1 node:
  left = heap.extractMin()
  right = heap.extractMin()
  parent = new Node(freq = left.freq + right.freq)
  parent.left = left
  parent.right = right
  heap.insert(parent)

root = heap.extractMin()

// Assign codes via DFS
function assignCodes(node, code):
  If node is leaf:
    codes[node.char] = code
    return
  assignCodes(node.left, code + "0")
  assignCodes(node.right, code + "1")

assignCodes(root, "")`,
    realWorldApplications: [
      {
        icon: '🗜️',
        industry: 'File Compression',
        title: 'ZIP / GZIP / DEFLATE Compression',
        description: 'The DEFLATE algorithm (used in ZIP, GZIP, PNG, and zlib) combines LZ77 dictionary compression with Huffman Coding for entropy encoding. Every zip file you\'ve ever created or extracted uses Huffman coding internally.',
        impact: 'ZIP compresses typical text files by 60–80%, saving petabytes of storage across billions of devices every day.',
      },
      {
        icon: '🖼️',
        industry: 'Image Compression',
        title: 'JPEG Image Encoding',
        description: 'JPEG uses Huffman Coding in its entropy encoding stage to compress the DCT coefficient data of image blocks. The variable-length codes produced by Huffman trees are what make JPEG files compact.',
        impact: 'JPEG serves 80%+ of images on the web — Huffman coding is embedded in trillions of image files stored and transmitted globally.',
      },
      {
        icon: '🎵',
        industry: 'Audio & Video Streaming',
        title: 'MP3 & H.264/H.265 Entropy Coding',
        description: 'MP3 audio encoding and H.264/H.265 video codecs (used on YouTube, Netflix, Zoom) use Huffman coding as the final entropy coding stage to reduce compressed bitstream size.',
        impact: 'H.265 with Huffman entropy coding cuts video file sizes in half vs H.264, enabling 4K/8K streaming at practical bandwidth levels.',
      },
      {
        icon: '🌐',
        industry: 'Web Protocols',
        title: 'HTTP/2 Header Compression (HPACK)',
        description: 'HTTP/2 uses HPACK, which combines static Huffman encoding to compress HTTP headers. Every modern web page load over HTTPS uses Huffman-compressed headers to reduce request/response overhead.',
        impact: 'Reduces HTTP header sizes by 85–90%, cutting page load times and bandwidth costs for the 60%+ of web traffic using HTTP/2.',
      },
      {
        icon: '📡',
        industry: 'Telecommunications',
        title: 'Data Transmission Error Correction',
        description: 'Satellite and deep-space communication systems use Huffman-family codes to compress telemetry data before transmission, maximising information density over extremely limited-bandwidth channels.',
        impact: 'NASA uses source coding (Huffman variants) in Mars rover data transmission to maximise science data returned over a 64kbps interplanetary link.',
      },
    ],
  },
};
