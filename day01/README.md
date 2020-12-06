# Day 1: Report Repair

## Notes

By using a line file reader, we are able to "start solving" the problem while the file is still being read, allowing us to potentially end "early" (before reading the whole file).

## Part 2 notes

The solution involves creating a lot of data that will end up being unused but allows us to realize we have found the value we were looking for really fast. This solution **does not scale well for large datasets** because it relies on creating more data for every entry on the dataset.
