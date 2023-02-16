if (import.meta.env.VITE_NODE_ENV === 'development') {
  const modules = import.meta.glob('./*')
  for (const module in modules) {
    await import(/* @vite-ignore */ module.replace('.ts', ''))
  }
}

export {}
