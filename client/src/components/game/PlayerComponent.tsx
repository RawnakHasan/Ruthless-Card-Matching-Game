import { Crown } from "lucide-react";
import { ClientPlayer } from "shared";
import UserAvatar from "../UserAvatar";
import { useUsernameStore } from "../../store/useUsernameStore";

const PlayerComponent = ({ player }: { player: ClientPlayer }) => {
  const { username } = useUsernameStore();
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <UserAvatar username={player.username} />
        {player.host ? (
          <Crown className="absolute -top-2 -left-2 -rotate-45 text-gold" />
        ) : (
          ""
        )}
      </div>
      <h1
        className={`text-xl max-w-32 truncate inline-block ${player.username === username ? "text-primary font-bold" : ""}`}
        title={player.username}
      >
        <span className="flex items-center justify-center gap-3">
          {player.username}
        </span>
      </h1>
    </div>
  );
};
export default PlayerComponent;
