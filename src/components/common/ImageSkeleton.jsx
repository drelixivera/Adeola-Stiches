const ImageSkeleton = () => {
  return (
    <div className="w-full aspect-square bg-warmBeige rounded-xl animate-pulse">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    </div>
  )
}

export default ImageSkeleton