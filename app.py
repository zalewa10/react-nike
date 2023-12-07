import strawberry
from typing import List
from starlette.middleware.cors import CORSMiddleware

@strawberry.type
class TableData:
    Dessert: str
    Calories: int
    Fat: float
    Carbs: int
    Protein: float

@strawberry.type
class DynamicTableData:
    text1: str
    text2: str
    data: List[TableData]

# array z danymi do wyświetlenia, póki co jeszcze statyczne
sample_data = [
    TableData(Dessert="Banan yoghurt", Calories=159, Fat=6.0, Carbs=24, Protein=4.0),
    TableData(Dessert="Ice cream sandwich", Calories=237, Fat=9.0, Carbs=37, Protein=4.3),
]

@strawberry.type
class Query:
    @strawberry.field
    def dynamicTableData(self) -> DynamicTableData:
        return DynamicTableData(
            text1="This is your random table:",
            text2="Some random text here.",
            data=sample_data
        )


schema = strawberry.Schema(query=Query)
from strawberry.asgi import GraphQL
app = GraphQL(schema)

app = CORSMiddleware(
    app,
    allow_origins=["http://localhost:3001"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
