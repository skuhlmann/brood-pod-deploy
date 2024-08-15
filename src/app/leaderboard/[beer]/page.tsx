export default function Leaderboard({ params }: { params: { beer: string } }) {
  return (
    <div>
      <h2 className="font-serif">leaderboard</h2>
      <div className="font-sans">beer: {params.beer}</div>
    </div>
  );
}
