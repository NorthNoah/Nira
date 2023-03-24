import { useProjectIdInUrl } from 'pages/kanban/util'

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()]
