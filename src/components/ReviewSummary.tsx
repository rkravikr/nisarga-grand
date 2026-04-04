import { HiStar, HiOutlinePencilAlt } from 'react-icons/hi'

const ReviewSummary = () => {
  const bars = [
    { stars: 5, percent: 75 },
    { stars: 4, percent: 45 },
    { stars: 3, percent: 20 },
    { stars: 2, percent: 8 },
    { stars: 1, percent: 15 },
  ]

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-center gap-12 max-w-2xl mx-auto mb-12 transition-colors">
      {/* Left side: Bars */}
      <div className="flex-1 w-full max-w-[300px]">
        <div className="flex flex-col gap-3">
          {bars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300 w-3">{bar.stars}</span>
              <div className="flex-1 h-2.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${bar.percent}%`, backgroundColor: '#FBBF24' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Overall Score */}
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-6xl font-bold text-gray-900 dark:text-white leading-none mb-2 font-heading">
          4.1
        </h2>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4].map((s) => (
            <HiStar key={s} className="text-yellow-400 text-xl" />
          ))}
          <HiStar className="text-gray-200 dark:text-zinc-700 text-xl" />
        </div>
        <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium mb-6">
          1,245 reviews
        </p>

        <a 
          href="https://maps.app.goo.gl/s1MackEYWcQDf6f69" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-semibold rounded-full transition-colors"
        >
          <HiOutlinePencilAlt className="text-lg" /> Write a review
        </a>
      </div>
    </div>
  )
}

export default ReviewSummary
