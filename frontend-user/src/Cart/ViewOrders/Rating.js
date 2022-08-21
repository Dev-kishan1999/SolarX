
/*
 * @author: Prachi Raval - B00883324
 *
 * This file has Rating for product.
 */

import React, { useState } from "react";
import { Box, Button, Icon, Stack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor, pid }, ref) => {
    const [rating, setRating] = useState(0);

    const rateProduct = () => {
      const user = localStorage.getItem("userid");
      console.log(user + "logged in user");
      console.log(pid);

      const data = {
        productid: pid,
        userid: user,
        rating,
      };
      fetch("https://solarx-backend.herokuapp.com/rateOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };

    const darkKiller = (idx) => {
      setRating(idx);
      rateProduct();
      // }
    };

    const RatingIcon = ({ fill }) => {
      return (
        <StarIcon
          name={icon}
          size={`${size}px`}
          color={fillColor}
          stroke={strokeColor}
          fillOpacity={fill ? "100%" : "0"}
        ></StarIcon>
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Button
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          variant="unstyled"
          mx={1}
          onClick={() => darkKiller(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Button>
      );
    };

    return (
      <Stack isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {/* {buttons} */}
        <RatingButton key={1} idx={1} fill={1 <= rating} />
        <RatingButton key={2} idx={2} fill={2 <= rating} />
        <RatingButton key={3} idx={3} fill={3 <= rating} />
        <RatingButton key={4} idx={4} fill={4 <= rating} />
        <RatingButton key={5} idx={5} fill={5 <= rating} />
        <Box width={`${size * 1.5}px`} textAlign="center">
          <Text fontSize="sm" textTransform="uppercase">
            Rating
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
            {rating}
          </Text>
        </Box>
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
