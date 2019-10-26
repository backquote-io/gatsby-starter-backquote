const fetch = require("node-fetch")

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a post to match Gatsby's node structure
  const processPost = post => {
    const nodeId = createNodeId(`backquote-post-${post.id}`)
    const nodeContent = JSON.stringify(post)
    const nodeData = Object.assign({}, post, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `BackquotePost`,
        content: nodeContent,
        contentDigest: createContentDigest(post),
      },
    })
    return nodeData
  }

  const token = configOptions.token
  const blogId = configOptions.blogId

  const apiUrl = `http://localhost:10000/expose/api/v1/${blogId}/posts`

  // TODO add pagination support
  return (
    fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      // Parse the response as JSON
      .then(response => response.json())
      // Process the response data into a node
      .then(data => {
        data.forEach(post => {
          // Process the post data to match the structure of a Gatsby node
          const nodeData = processPost(post)
          // Use Gatsby's createNode helper to create a node from the node data
          createNode(nodeData)
        })
      })
  )
}
