import styled from 'styled-components'

export const HeaderBackground=styled.div`
    background-color: ${props=>props.theme['white']};//#fafafa;
    padding: 10px 0;
`

export const HeaderContainer=styled.header`
    max-width: 1160px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
`
export const ImgContainer=styled.img`
    width: 50px;
`

export const UserContainer=styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 6px;
    padding: 6px;

    &:hover {
        background-color: ${props=>props.theme['gray-100']};
    }

    & > span {
        font-size: 1.5rem;
    }
`