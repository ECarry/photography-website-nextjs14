import ConfettiCannon from "@/components/ConfettiCannon";
import Icon from "@/components/icons";

interface FavoriteActionProps {
  id: string;
  isFavorited: boolean;
}

const FavoriteAction = ({
  id,
  isFavorited
}: FavoriteActionProps) => {
  const handleClick = () => {
    
  }

  return (
    <>
      <button onClick={handleClick}>
        <Icon 
          name="heart"
          animated="CLICK"
          loop={false}
          size={28}
        />
      </button>
      <ConfettiCannon
        onFire={handleClick}
      />
    </>
  )
}

export default FavoriteAction
