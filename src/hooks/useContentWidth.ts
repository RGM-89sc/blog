const { useState, useEffect } = require('react')

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  }
}

function getContentWidth() {
  const { innerWidth } = getSize()
  if (innerWidth > 1400) {
    return '50vw'
  } else if (innerWidth > 1200) {
    return '60vw'
  } else if (innerWidth > 1000) {
    return '70vw'
  } else if (innerWidth > 800) {
    return '80vw'
  } else if (innerWidth > 600) {
    return '90vw'
  } else {
    return '100vw'
  }
}

function useContentWidth() {
  let [contentWidth, setContentWidth] = useState(getContentWidth())

  function debounce(handle: () => any, delay: number) {
    let timer: number
    return () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(handle, delay)
    }
  }

  function handleResize() {
    setContentWidth(getContentWidth())
  }

  useEffect(() => {
    const handler = debounce(handleResize, 500)
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return contentWidth
}

export default useContentWidth