import {Link, NavLink} from 'react-router-dom'

const OpenGames = ({games, joinGame}) => 
{
return (
    <table id="juegos-abiertos" style={{border: "3px solid rgb(0, 0, 0)"}}>
      <thead>
        <tr>
          <th>Creator</th>
          <th>Opponent</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {games.length > 0 ? (
            games.map((user) => (
            <tr key={user.creator}>
                <td>{user.creator}</td>
                <td>{user.opponent ? user.opponent : "-------"}</td>
                <td>
                  <NavLink to={'/Game'} onClick={()=>joinGame(user.creator)}>{user.opponent === "WAITING" ? "Join Game" : "Observe"}</NavLink>
                </td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan={3}>No games</td>
            </tr>
        )}
      </tbody>
    </table>
  )}
  

export default OpenGames;