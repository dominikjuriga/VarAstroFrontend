import React from 'react'
import { IStar } from "../models"
import { formatCoordinate } from "../helpers"

interface IProps {
  data: IStar
}

const StarTable: React.FC<IProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>RA:</th>
          <td>{formatCoordinate(data.ra)}</td>
        </tr>

        <tr>
          <th>DEC:</th>
          <td>{formatCoordinate(data.dec)}</td>
        </tr>

        {data.starPublish && (
          <tr>
            <th>Discoverer</th>
            <td>{data.starPublish.discoverer}</td>
          </tr>
        )}
        <tr>
          <th>

          </th>
        </tr>
      </tbody>
    </table>
  )
}

export default StarTable