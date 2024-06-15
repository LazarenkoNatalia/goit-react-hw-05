import stylLoadMore from './LoadMoreBtn.module.css'

export default function LoadMoreBtn({ handleClickMore, disabled }) {
  return (
    <button type="button" className={stylLoadMore.loadMore} onClick={handleClickMore} disabled={disabled}>Load More</button>
  )
}
