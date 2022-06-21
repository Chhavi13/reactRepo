import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUser } from './getUserSlice'
import Table from 'react-bootstrap/Table';

export const UserTable = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getAllUser())

  }, [])
  return (
    <div >
      <h2>List of users</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>phone</th>
            <th>Username</th>
            <th>Email</th>

          </tr>
        </thead>
        <tbody>
          {user.loading && <>loading..</>}

          {
            (!user.loading && user.users.length) && user.users.map((value, key) => {
              return (
                <tr key={value.id}>
                  <td >{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.phone}</td>
                  <td>{value.username}</td>
                  <td>{value.email}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

    </div>
  )
}
