import React from "react";
import { useHistory } from "react-router-dom";
import { get } from "lodash";
import {
  Button,
  Dialog,
  Icon,
  Pane,
  majorScale,
  minorScale,
} from "evergreen-ui";
import { Link, Text } from "components/materials";
import { AuthContext } from "utils/context";

function IngredientList({ ingredients }) {
  return (
    <Pane>
      <Text>Ingredients:</Text>
      {ingredients.map((ingredient, index) => {
        return (
          <Pane display="flex" alignItems="center" key={index}>
            <Icon icon="dot" size={12} />
            <Text>{`${ingredient}`}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
}

export function RecipeCard({ deleteRecipe, deleteRecipeLoading, recipe }) {
  const [openDeleteWarningDialog, setOpenDeleteWarningDialog] = React.useState(
    false
  );
  const { userId } = React.useContext(AuthContext);
  const history = useHistory();

  const recipeDate = new Date(recipe.insertedAt);

  return (
    <React.Fragment>
      <Pane border="default" padding={majorScale(4)} margin={majorScale(4)}>
        {userId && userId === recipe.user.id && (
          <Pane marginBottom={majorScale(2)}>
            <Button
              appearance="primary"
              marginRight={majorScale(2)}
              onClick={() => {
                history.push(`/recipe/${recipe.id}/edit`);
              }}
            >
              Edit
            </Button>
            <Button
              appearance="primary"
              intent="danger"
              onClick={() => setOpenDeleteWarningDialog(true)}
            >
              Delete
            </Button>
          </Pane>
        )}
        <Pane
          marginBottom={majorScale(2)}
          display="flex"
          flexDirection="column"
        >
          <Pane display="flex">
            <Pane marginRight={minorScale(1)}>
              <Link
                to={`/user/${recipe.user.username}/recipe/${recipe.id}`}
                fontSize={20}
              >
                {recipe.name}
              </Link>
            </Pane>
            {recipe.user && (
              <React.Fragment>
                <Text fontSize={20} marginRight={minorScale(1)}>
                  {" "}
                  by{" "}
                </Text>
                <Link
                  to={`/user/${recipe.user.username}/recipes`}
                  fontSize={20}
                >
                  {recipe.user.username}
                </Link>
              </React.Fragment>
            )}
          </Pane>
          <Text marginTop={majorScale(1)}>
            Created on: {recipeDate.getMonth()}/{recipeDate.getDate()}/
            {recipeDate.getFullYear()}
          </Text>
          <Text>Description: {recipe.description}</Text>
          <Text>Prep time: {recipe.prepTime}</Text>
          <Text>Cooking method: {recipe.cookingMethod}</Text>
          <Text>Yields: {recipe.yields}</Text>
        </Pane>
        {recipe.ingredients.length > 0 && (
          <IngredientList ingredients={recipe.ingredients} />
        )}
        {recipe.instructions && (
          <Pane display="flex" flexDirection="column">
            {get(recipe, "instructions", []).map((instruction, index) => (
              <Text key={index}>{`${index + 1}. ${instruction}`}</Text>
            ))}
          </Pane>
        )}
      </Pane>
      <Dialog
        confirmLabel="Delete recipe"
        intent="danger"
        isConfirmLoading={deleteRecipeLoading}
        isShown={openDeleteWarningDialog}
        onCloseComplete={() => setOpenDeleteWarningDialog(false)}
        onConfirm={() =>
          deleteRecipe({ variables: { id: recipe.id } }).then(() =>
            setOpenDeleteWarningDialog(false)
          )
        }
        preventBodyScrolling
        title="Delete recipe?"
      >
        Are you sure you want to delete this recipe?
      </Dialog>
    </React.Fragment>
  );
}
