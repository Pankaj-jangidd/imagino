export interface SlideContent {
    title: string
    content: string[]
  }
  
  export interface PresentationResult {
    status: string
    file_path: string
    preview: SlideContent[]
  }
  
  export interface ApiError {
    detail: string
  }
  