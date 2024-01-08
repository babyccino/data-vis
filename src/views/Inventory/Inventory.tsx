import { CardOverflow, CircularProgress } from "@mui/joy"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import Typography from "@mui/joy/Typography"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getModels } from "../../api/getModels"
import { Model } from "../../api/mockedData"

function ModelCard(props: Model & { loading?: boolean }) {
  /* <div className="block hover:drop-shadow-[0_10px_10px_rgba(0,0,255,0.25)]"> */
  return (
    <Card
      variant="outlined"
      sx={{ width: 250, "&:hover": { borderColor: "blue" } }}
      orientation="horizontal"
    >
      <Link
        to={`/analysis/${props.model_name}`}
        className="absolute inset-0 z-10"
        aria-label={`go to ${props.model_name}`}
      ></Link>
      <CardContent>
        <Typography level="title-md">{props.model_name}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ padding: "0 1rem" }}>
        <CardContent sx={{ display: "flex", justifyContent: "center" }} orientation="horizontal">
          <Typography level="title-sm" sx={{ margin: "auto" }}>
            {props.model_type}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}

const Inventory = () => {
  const [loading, setLoading] = useState(false)
  const [models, setModels] = useState<Model[]>([])

  useEffect(() => {
    setLoading(true)
    getModels().then(({ data: newModels }) => {
      setModels(newModels)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center">
      <div className="inline-flex flex-shrink flex-row flex-wrap justify-center gap-4">
        {loading ? <CircularProgress /> : models.map(model => <ModelCard {...model} />)}
      </div>
    </div>
  )
}

export default Inventory
