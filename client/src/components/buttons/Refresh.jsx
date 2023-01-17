import { refreshBtn } from "../../styles/Buttons.module.css";

export default function Refresh({ handleRefresh }) {
  return (
    <div>
      <button className={refreshBtn} onClick={() => handleRefresh()} />
    </div>
  );
}
