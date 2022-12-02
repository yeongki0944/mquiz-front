import styled from "styled-components";

export const Page_Default = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: #f5f5f5;
`;

export const Page_Gradiant = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: linear-gradient(to right, rebeccapurple, salmon);
`;

export const Item_c_basic = styled.div`
    margin :auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item_c = styled.div`
    margin :auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item_Modal = styled.div`
    background: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin: auto;
    width: 400px;
    height: 250px;
    display: block;
    justify-content: center;
    align-items: center;
`;
