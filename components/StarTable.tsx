import React from 'react'

interface IStar {
  name: string,
  ra: number,
  dec: number,
  starPublish: {
    discoverer: string
  }
}

interface IProps {
  data: IStar
}

const StarTable: React.FC<IProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>RA:</th>
          <td>{data.ra}</td>
        </tr>

        <tr>
          <th>DEC:</th>
          <td>{data.dec}</td>
        </tr>

        <tr>
          <th>Discoverer</th>
          <td>{data.starPublish.discoverer}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StarTable