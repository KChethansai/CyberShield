import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CATEGORIES, POINTS_PER_CORRECT, STARTING_LIVES } from '../utils/gameConstants'

export { CATEGORIES }
export { CATEGORY_LABELS } from '../utils/gameConstants'

//base game state
const initialState = {
  questions: { phishing: [], password: [], qr: [], scam: [] },
  difficulty: 'normal',
  categoryIndex: 0,
  currentQuestionIndex: 0,
  lives: STARTING_LIVES,
  points: 0,
  answeredQuestions: [], // { questionId, category, chosenIndex, correct }
  gameStatus: 'not-started' // not-started | in-progress | game-over | completed
}

export const getTotalQuestions = (questions) => {
  return CATEGORIES.reduce(
    (sum, cat) => sum + (questions[cat]?.length || 0),
    0
  )
}

export const useGame = create(
  persist(
    (set) => ({
      ...initialState,

      //start game action
      startGame: ({ questions, difficulty = 'normal', lives }) =>
        set({
          ...initialState,
          questions,
          difficulty,
          lives: lives !== undefined ? lives : STARTING_LIVES,
          gameStatus: 'in-progress'
        }),

      //answer question action
      answerQuestion: ({ questionId, category, chosenIndex, correct }) =>
        set((state) => {
          if (state.gameStatus !== 'in-progress') return state
          // Guard against duplicate answering of the same question
          if (state.answeredQuestions.some((q) => q.questionId === questionId)) {
            return state
          }
          return {
            lives: correct ? state.lives : Math.max(0, state.lives - 1),
            points: correct ? state.points + POINTS_PER_CORRECT : state.points,
            answeredQuestions: [
              ...state.answeredQuestions,
              { questionId, category, chosenIndex, correct }
            ]
          }
        }),

      //advance to next question action
      nextQuestion: () =>
        set((state) => {
          if (state.gameStatus !== 'in-progress') return state
          // Out of lives -> game over (checked on advance so the player
          // still sees the explanation for the final question).
          if (state.lives <= 0) return { gameStatus: 'game-over' }
          const category = CATEGORIES[state.categoryIndex]
          const isLastInCategory =
            state.currentQuestionIndex >= (state.questions[category]?.length || 0) - 1
          if (!isLastInCategory) {
            return { currentQuestionIndex: state.currentQuestionIndex + 1 }
          }
          if (state.categoryIndex >= CATEGORIES.length - 1) {
            return { gameStatus: 'completed' }
          }
          return {
            categoryIndex: state.categoryIndex + 1,
            currentQuestionIndex: 0
          }
        }),

      //reset game action
      resetGame: () => set({ ...initialState })
    }),
    {
      name: 'cybershield-active-session',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.useGame = useGame
}
