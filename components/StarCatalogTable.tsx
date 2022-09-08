import React from 'react'
import s from "../styles/StarCatalogTable.module.css"
import { IStarCatalogs } from "../models"
import { formatCoordinate } from "../helpers"

interface IProps {
  starCatalogs: IStarCatalogs[]
}

const StarCatalogTable: React.FC<IProps> = ({ starCatalogs }) => {
  return (
    <table className={s.starCatalogTable}>
      <thead>
        <tr>
          <th>Catalog</th>
          <th>RA</th>
          <th>DEC</th>
          <th>MAG</th>
          <th>Cross ID</th>
        </tr>
      </thead>
      <tbody>
        {starCatalogs.map((sc => (
          <tr key={sc.crossId}>
            <td>{sc.catalogId}</td>
            <td>{formatCoordinate(sc.ra)}</td>
            <td>{formatCoordinate(sc.dec)}</td>
            <td>{formatCoordinate(sc.mag)}</td>
            <td>{sc.crossId}</td>
          </tr>
        )))}
      </tbody>
    </table>
  )
}

export default StarCatalogTable