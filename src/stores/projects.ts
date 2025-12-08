import { useLocalStorage } from '@vueuse/core'
import { deburr, lowerCase, maxBy, trim } from 'es-toolkit'
import { isNumber } from 'es-toolkit/compat'
import { readonly } from 'vue'

interface CreatedEntity { readonly id: number }

export interface ProjectSection extends CreatedEntity {
  rows: number
  cols: number
}
export interface Project extends CreatedEntity {
  name: string
  sections: ProjectSection[]
  current: number
  readonly created: string
  modified: string
}

export interface ProjectSectionToCreate extends Omit<ProjectSection, 'id'> {}

export interface ProjectToCreate {
  name: string
  sections: ProjectSectionToCreate[]
}

const projects = useLocalStorage<Project[]>('projects', [])

function useProjects () {
  const getProject = (id: number) => {
    const project = projects.value.find(p => p.id === id)
    if (!project) {
      throw new Error(`Project ${id} not found`)
    }
    return readonly(project)
  }
  const internalGetProject = (id: number) => {
    const project = projects.value.find(p => p.id === id)
    if (!project) {
      throw new Error(`Project ${id} not found`)
    }
    return project
  }

  const searchProjects = (query?: string) => {
    if (!query) {
      return readonly(projects.value)
    }
    return readonly(projects.value.filter(p => lowerCase(deburr(p.name)).includes(lowerCase(deburr(query)))))
  }

  const addProject = (projectToCreate: ProjectToCreate) => {
    if (projects.value.some(p => lowerCase(deburr(p.name)) === trim(lowerCase(deburr(projectToCreate.name))))) {
      projectToCreate.name += ' (1)'
    }

    const project = {
      ...projectToCreate,
      name: trim(projectToCreate.name),
      sections: projectToCreate.sections.map((g, i) => ({ ...g, id: i + 1 })),
      id: (maxBy(projects.value, p => p.id)?.id || 0) + 1,
      current: 0,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    }
    projects.value.push(project)
    return readonly(project)
  }

  const patchProject = (id: number, patch: Partial<{ name: string }>) => {
    const project = internalGetProject(id)
    if (!project) {
      throw new Error(`Project ${id} not found`)
    }
    if (patch.name) {
      project.name = patch.name // Object pointer suffice
    }
    project.modified = new Date().toISOString()
    return readonly(project)
  }

  const patchProjectSection = (id: number, sectionId: number, patch: Partial<{ cols: number, rows: number }>) => {
    const project = internalGetProject(id)
    if (!project) {
      throw new Error(`Project ${id} not found`)
    }
    const section = project.sections.find(s => s.id === sectionId)
    if (!section) {
      throw new Error(`Section ${sectionId} of project ${id} not found`)
    }

    if (isNumber(patch.cols)) {
      section.cols = patch.cols // Object pointer suffice
    }
    if (isNumber(patch.rows)) {
      section.rows = patch.rows // Object pointer suffice
    }
    project.modified = new Date().toISOString()
    return readonly(project)
  }

  const advanceProject = (id: number, direction = 1 as 1 | -1) => {
    const project = internalGetProject(id)
    if (!project) {
      throw new Error(`Project ${id} not found`)
    }
    project.current += direction
    project.modified = new Date().toISOString()

    return readonly(project)
  }

  const removeProject = (id: number) => {
    projects.value = projects.value.filter(p => p.id !== id)
  }

  return { addProject, removeProject, getProject, searchProjects, patchProject, patchProjectSection, advanceProject }
}

export default useProjects
